"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { AuthUser, RegisterResult, getMe, loginUser, registerUser, updateMe, deleteAccount, uploadPhoto, deletePhoto } from "@/lib/services/authService";

const TOKEN_KEY = "trt_jwt";

interface AuthContextType {
  user: AuthUser | null;
  jwt: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (params: { nom: string; email: string; password: string; telephone?: string; newsletter?: boolean }) => Promise<RegisterResult>;
  logout: () => void;
  update: (data: Partial<Pick<AuthUser, "nom" | "email" | "telephone">> & { password?: string }) => Promise<void>;
  updatePhoto: (file: File) => Promise<void>;
  removePhoto: () => Promise<void>;
  removeAccount: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [jwt, setJwt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearToken = () => {
    localStorage.removeItem(TOKEN_KEY);
    setJwt(null);
    setUser(null);
  };

  const refreshUser = useCallback(async () => {
    const token = jwt || localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      const me = await getMe(token);
      setUser(me);
      setJwt(token);
    } catch {
      clearToken();
    } finally {
      setIsLoading(false);
    }
  }, [jwt]);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      setJwt(token);
      getMe(token)
        .then(setUser)
        .catch(() => clearToken())
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await loginUser(email, password);
    setUser(res.user);
    setJwt(res.jwt);
    setIsLoading(false);
    localStorage.setItem(TOKEN_KEY, res.jwt);

    // If there's a pending profile from registration, save it now
    try {
      const pending = localStorage.getItem("trt_pending_profile");
      if (pending) {
        localStorage.removeItem("trt_pending_profile");
        const profileData = JSON.parse(pending);
        updateMe(res.jwt, profileData)
          .then((updated) => setUser(updated))
          .catch(() => {});
      }
    } catch {}
  };

  const register = async (params: { nom: string; email: string; password: string; telephone?: string; newsletter?: boolean }): Promise<RegisterResult> => {
    const result = await registerUser(params);
    if (!result.needsEmailVerification && result.auth) {
      setUser(result.auth.user);
      setJwt(result.auth.jwt);
      setIsLoading(false);
      localStorage.setItem(TOKEN_KEY, result.auth.jwt);
    }
    return result;
  };

  const logout = () => {
    clearToken();
  };

  const update = async (data: Partial<Pick<AuthUser, "nom" | "email" | "telephone">> & { password?: string }) => {
    if (!jwt) throw new Error("Non authentifié");
    const updated = await updateMe(jwt, data);
    setUser(updated);
  };

  const updatePhoto = async (file: File) => {
    if (!jwt) throw new Error("Non authentifié");
    const updated = await uploadPhoto(jwt, file);
    setUser(updated);
  };

  const removePhoto = async () => {
    if (!jwt) throw new Error("Non authentifié");
    const updated = await deletePhoto(jwt);
    setUser(updated);
  };

  const removeAccount = async () => {
    if (!jwt) throw new Error("Non authentifié");
    await deleteAccount(jwt);
    clearToken();
  };

  return (
    <AuthContext.Provider value={{ user, jwt, isLoading, login, register, logout, update, updatePhoto, removePhoto, removeAccount, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
