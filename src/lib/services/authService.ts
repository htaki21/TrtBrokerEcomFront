const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";

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
  return errorMessages[message] || fallback;
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
    const err = data as StrapiError;
    throw new Error(translateError(err.error?.message, "Erreur de connexion. Vérifiez vos identifiants."));
  }

  return data as AuthResponse;
}

export async function registerUser(params: {
  nom: string;
  email: string;
  password: string;
  telephone?: string;
  newsletter?: boolean;
}): Promise<AuthResponse> {
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
    const err = data as StrapiError;
    throw new Error(translateError(err.error?.message, "Erreur lors de l'inscription. Veuillez réessayer."));
  }

  const authData = data as AuthResponse;

  // Merge registration params into user immediately so they're available in context
  authData.user = {
    ...authData.user,
    nom: params.nom,
    telephone: params.telephone || null,
    newsletter: params.newsletter || false,
  };

  // Step 2: Persist custom fields to Strapi via custom endpoint
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
  }).catch(() => {
    // Strapi update failed — data is still in local context
  });

  return authData;
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

export async function deleteAccount(jwt: string): Promise<void> {
  const res = await fetch(`${STRAPI_URL}/api/user-profile/me`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${jwt}` },
  });

  if (!res.ok) {
    throw new Error("Erreur lors de la suppression du compte");
  }
}
