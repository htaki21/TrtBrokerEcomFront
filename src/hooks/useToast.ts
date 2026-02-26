"use client";

import { useEffect, useState } from "react";
import { safeToast } from "@/lib/toast";
import { fallbackToast } from "@/components/NotificationFallback";

export function useToast() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Ensure we're in browser and toast is ready
    if (typeof window !== "undefined") {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const showToast = (type: "success" | "error" | "loading", message: string, options?: Record<string, unknown>) => {
    // Always try the main toast first
    let result = null;
    
    if (isReady) {
      try {
        switch (type) {
          case "success":
            result = safeToast.success(message, options);
            break;
          case "error":
            result = safeToast.error(message, options);
            break;
          case "loading":
            result = safeToast.loading(message, options);
            break;
        }
      } catch (error) {
        console.log("Main toast failed, using fallback:", error);
      }
    }

    // If main toast failed or not ready, use fallback
    if (!result) {
      console.log(`Using fallback toast: ${message}`);
      switch (type) {
        case "success":
          fallbackToast.success(message);
          break;
        case "error":
          fallbackToast.error(message);
          break;
        case "loading":
          fallbackToast.loading(message);
          break;
      }
    }

    return result;
  };

  return {
    success: (message: string, options?: Record<string, unknown>) => showToast("success", message, options),
    error: (message: string, options?: Record<string, unknown>) => showToast("error", message, options),
    loading: (message: string, options?: Record<string, unknown>) => showToast("loading", message, options),
    dismiss: safeToast.dismiss,
    isReady,
  };
}
