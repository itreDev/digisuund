"use client";
import React, { useEffect, useState } from "react";
import { X, CheckCircle2, AlertCircle } from "lucide-react";

interface AlertProps {
  type: "success" | "error";
  message: string;
  show: boolean;
  onClose: () => void;
  duration?: number;
}

export const Alert: React.FC<AlertProps> = ({
  type,
  message,
  show,
  onClose,
  duration = 5000,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose(), 300);
      }, duration);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [show, duration, onClose]);

  if (!show && !isVisible) return null;

  const isSuccess = type === "success";
  const Icon = isSuccess ? CheckCircle2 : AlertCircle;

  return (
    <div
      className={`fixed top-24 right-6 z-50 max-w-md transition-all duration-300 ease-in-out ${
        isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-full pointer-events-none"
      }`}
    >
      <div
        className={`p-4 bg-white border-2 rounded-lg shadow-lg flex items-center gap-3 backdrop-blur-sm ${
          isSuccess ? "border-primary/30" : "border-red-500/30"
        }`}
      >
        <Icon
          className={`h-5 w-5 shrink-0 ${
            isSuccess ? "text-primary" : "text-red-500"
          }`}
        />
        <p className="text-sm text-foreground flex-1">{message}</p>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onClose(), 300);
          }}
          className="text-description hover:text-foreground transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
