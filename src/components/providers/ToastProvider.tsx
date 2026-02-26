"use client";

import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

export default function ToastProvider() {
  const [mounted, setMounted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsClient(true);
  }, []);

  // Don't render on server or during hydration
  if (!mounted || !isClient) {
    return null;
  }

  // Additional check for production
  if (typeof window === "undefined") {
    return null;
  }

  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 5000,
        style: {
          borderRadius: "8px",
          padding: "12px 16px",
          fontSize: "14px",
          fontWeight: "500",
          zIndex: 99999,
          position: "fixed",
          maxWidth: "400px",
          wordWrap: "break-word",
        },
      }}
      containerStyle={{
        top: 20,
        right: 20,
      }}
    />
  );
}
