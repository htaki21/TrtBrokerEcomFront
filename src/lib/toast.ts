"use client";

import toast from "react-hot-toast";

// Toast configuration for production
const TOAST_CONFIG = {
  duration: 5000,
  position: "top-right" as const,
  style: {
    borderRadius: "8px",
    padding: "12px 16px",
    fontSize: "14px",
    fontWeight: "500",
    zIndex: 99999,
    position: "fixed" as const,
    maxWidth: "400px",
    wordWrap: "break-word" as const,
  },
  success: {
    style: {
      background: "#10B981",
      color: "#fff",
      border: "1px solid #059669",
    },
  },
  error: {
    style: {
      background: "#EF4444",
      color: "#fff",
      border: "1px solid #DC2626",
    },
  },
};

// Check if we're in browser environment
const isBrowser = typeof window !== "undefined";

// Safe toast function that works in production
const safeToastCall = (
  toastFn: (message: string, options?: Record<string, unknown>) => unknown, 
  message: string, 
  options?: Record<string, unknown>
) => {
  if (!isBrowser) {
    console.log("Toast (SSR):", message);
    return null;
  }

  try {
    return toastFn(message, {
      ...TOAST_CONFIG,
      ...options,
    });
  } catch {
    console.log("Toast fallback:", message);
    return null;
  }
};

// Safe toast wrapper with error handling
export const safeToast = {
  success: (message: string, options?: Record<string, unknown>) => {
    return safeToastCall(toast.success, message, {
      ...TOAST_CONFIG.success,
      ...options,
    });
  },

  error: (message: string, options?: Record<string, unknown>) => {
    return safeToastCall(toast.error, message, {
      ...TOAST_CONFIG.error,
      ...options,
    });
  },

  loading: (message: string, options?: Record<string, unknown>) => {
    return safeToastCall(toast.loading, message, options);
  },

  dismiss: (toastId?: string) => {
    if (!isBrowser) return;
    
    try {
      if (toastId) {
        toast.dismiss(toastId);
      } else {
        toast.dismiss();
      }
    } catch {
      // Silent fail for dismiss
    }
  },
};

// Export the original toast for advanced usage
export { toast };
export default safeToast;
