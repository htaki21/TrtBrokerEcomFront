"use client";

import { useEffect, useState } from "react";

interface Notification {
  id: string;
  type: "success" | "error" | "loading";
  message: string;
}

let notifications: Notification[] = [];
let listeners: Array<() => void> = [];

const notify = (type: "success" | "error" | "loading", message: string) => {
  const id = Math.random().toString(36).substr(2, 9);
  const notification: Notification = { id, type, message };
  
  notifications.push(notification);
  listeners.forEach(listener => listener());
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    notifications = notifications.filter(n => n.id !== id);
    listeners.forEach(listener => listener());
  }, 5000);
};

export const fallbackToast = {
  success: (message: string) => notify("success", message),
  error: (message: string) => notify("error", message),
  loading: (message: string) => notify("loading", message),
};

export default function NotificationFallback() {
  const [notificationsList, setNotificationsList] = useState<Notification[]>([]);

  useEffect(() => {
    const updateNotifications = () => {
      setNotificationsList([...notifications]);
    };

    listeners.push(updateNotifications);
    updateNotifications();

    return () => {
      listeners = listeners.filter(listener => listener !== updateNotifications);
    };
  }, []);

  if (notificationsList.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[99999] space-y-2">
      {notificationsList.map((notification) => (
        <div
          key={notification.id}
          className={`
            px-4 py-3 rounded-lg shadow-lg max-w-sm
            ${
              notification.type === "success"
                ? "bg-green-500 text-white"
                : notification.type === "error"
                ? "bg-red-500 text-white"
                : "bg-yellow-500 text-white"
            }
          `}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{notification.message}</span>
            <button
              onClick={() => {
                notifications = notifications.filter(n => n.id !== notification.id);
                listeners.forEach(listener => listener());
              }}
              className="ml-2 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
