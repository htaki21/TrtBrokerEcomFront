const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
if (!process.env.NEXT_PUBLIC_STRAPI_API_URL && typeof window !== "undefined") {
  console.warn("[TRT] NEXT_PUBLIC_STRAPI_API_URL is not set — using localhost:1337 fallback");
}

const errorMessages: Record<string, string> = {
  "Invalid identifier or password": "Email ou mot de passe incorrect",
  "Your account email is not confirmed": "Votre adresse email n'est pas confirmée",
  "Your account has been blocked by an administrator": "Votre compte a été bloqué par un administrateur",
  "Email or Username are already taken": "Cet email est déjà utilisé",
  "An error occurred during account creation": "Une erreur est survenue lors de la création du compte",
  "Too many attempts, please try again later.": "Trop de tentatives, veuillez réessayer plus tard",
  "password must be at least 6 characters": "Le mot de passe doit contenir au moins 6 caractères",
  "email must be a valid email": "Veuillez entrer un email valide",
  "Forbidden": "Accès refusé",
};

function translateError(message: string, fallback: string): string {
  if (!message) return fallback;
  // Exact match first
  if (errorMessages[message]) return errorMessages[message];
  // Partial match for variations (e.g. Strapi v5 may send slightly different messages)
  const lowerMsg = message.toLowerCase();
  if (lowerMsg.includes("not confirmed") || lowerMsg.includes("email is not confirmed")) {
    return "Votre adresse email n'est pas encore vérifiée. Consultez votre boîte mail pour confirmer votre compte.";
  }
  if (lowerMsg.includes("invalid identifier") || lowerMsg.includes("invalid credentials")) {
    return "Email ou mot de passe incorrect";
  }
  if (lowerMsg.includes("blocked")) {
    return "Votre compte a été bloqué par un administrateur";
  }
  return fallback;
}

export interface StrapiMedia {
  id: number;
  url: string;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
  };
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  nom: string | null;
  telephone: string | null;
  newsletter: boolean;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  photo?: StrapiMedia | null;
}

interface AuthResponse {
  jwt: string;
  user: AuthUser;
}

interface StrapiError {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
  };
}

export async function loginUser(identifier: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${STRAPI_URL}/api/auth/local`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    // Strapi can return errors in multiple formats depending on version
    const errMsg =
      (typeof data?.error === "object" ? data.error.message : undefined) || // Strapi v4: { error: { message } }
      data?.message?.[0]?.messages?.[0]?.message || // Strapi v3
      (typeof data?.message === "string" ? data.message : undefined) || // Strapi v5: { error: "ApplicationError", message: "..." }
      "";

    // A 500 on login usually means email confirmation is misconfigured
    if (res.status === 500) {
      throw new Error("Votre adresse email n'est pas encore vérifiée, ou une erreur serveur est survenue. Vérifiez votre boîte mail.");
    }
    throw new Error(translateError(errMsg, "Erreur de connexion. Vérifiez vos identifiants."));
  }

  return data as AuthResponse;
}

export interface RegisterResult {
  needsEmailVerification: boolean;
  auth?: AuthResponse;
  email?: string;
}

export async function registerUser(params: {
  nom: string;
  email: string;
  password: string;
  telephone?: string;
  newsletter?: boolean;
}): Promise<RegisterResult> {
  // Step 1: Register with standard Strapi fields only
  const res = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: params.email,
      email: params.email,
      password: params.password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    const errMsg =
      (typeof data?.error === "object" ? data.error.message : undefined) ||
      (typeof data?.message === "string" ? data.message : undefined) ||
      "";
    throw new Error(translateError(errMsg, "Erreur lors de l'inscription. Veuillez réessayer."));
  }

  // When email confirmation is enabled, Strapi returns user but no JWT
  const hasJwt = !!data.jwt;
  const user = data.user;

  if (hasJwt) {
    // No email confirmation required — login immediately
    const authData = data as AuthResponse;
    authData.user = {
      ...authData.user,
      nom: params.nom,
      telephone: params.telephone || null,
      newsletter: params.newsletter || false,
    };

    // Persist custom fields
    fetch(`${STRAPI_URL}/api/user-profile/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authData.jwt}`,
      },
      body: JSON.stringify({
        nom: params.nom,
        telephone: params.telephone || null,
        newsletter: params.newsletter || false,
      }),
    }).catch(() => {});

    return { needsEmailVerification: false, auth: authData };
  }

  // Email confirmation required — persist custom fields via admin workaround
  // Store custom fields in localStorage temporarily so they can be saved after confirmation
  try {
    localStorage.setItem("trt_pending_profile", JSON.stringify({
      nom: params.nom,
      telephone: params.telephone || null,
      newsletter: params.newsletter || false,
    }));
  } catch {}

  return { needsEmailVerification: true, email: params.email };
}

export async function resendConfirmationEmail(email: string): Promise<void> {
  const res = await fetch(`${STRAPI_URL}/api/auth/send-email-confirmation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const data = await res.json();
    const err = data as StrapiError;
    throw new Error(translateError(err.error?.message, "Erreur lors de l'envoi de l'email de confirmation."));
  }
}

export async function getMe(jwt: string): Promise<AuthUser> {
  const res = await fetch(`${STRAPI_URL}/api/users/me`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });

  if (!res.ok) {
    throw new Error("Session expirée");
  }

  return res.json();
}

export async function updateMe(jwt: string, data: Partial<Pick<AuthUser, "nom" | "email" | "telephone">> & { password?: string }): Promise<AuthUser> {
  const res = await fetch(`${STRAPI_URL}/api/user-profile/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(translateError(err.error?.message, "Erreur lors de la mise à jour du profil."));
  }

  return res.json();
}

export async function uploadPhoto(jwt: string, file: File): Promise<AuthUser> {
  const formData = new FormData();
  formData.append("photo", file);

  const res = await fetch(`${STRAPI_URL}/api/user-profile/photo`, {
    method: "POST",
    headers: { Authorization: `Bearer ${jwt}` },
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Erreur lors du téléchargement de la photo.");
  }

  return res.json();
}

export async function deletePhoto(jwt: string): Promise<AuthUser> {
  const res = await fetch(`${STRAPI_URL}/api/user-profile/photo`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${jwt}` },
  });

  if (!res.ok) {
    throw new Error("Erreur lors de la suppression de la photo.");
  }

  return res.json();
}

export interface UserLead {
  id: number;
  type: string;
  status: string;
  prenom: string;
  nom: string;
  createdAt: string;
}

export async function getMyLeads(jwt: string): Promise<UserLead[]> {
  const res = await fetch(`${STRAPI_URL}/api/user-profile/my-leads`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });

  if (!res.ok) {
    throw new Error("Erreur lors du chargement des demandes.");
  }

  return res.json();
}

export async function getLeadDetail(jwt: string, leadType: string, leadId: number): Promise<Record<string, unknown>> {
  const res = await fetch(`${STRAPI_URL}/api/user-profile/lead/${leadType}/${leadId}`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });

  if (!res.ok) {
    throw new Error("Erreur lors du chargement des détails.");
  }

  return res.json();
}

export async function deleteAccount(jwt: string): Promise<void> {
  const res = await fetch(`${STRAPI_URL}/api/user-profile/me`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${jwt}` },
  });

  if (!res.ok) {
    throw new Error("Erreur lors de la suppression du compte");
  }
}
