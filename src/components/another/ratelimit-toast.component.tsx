"use client"

import { useEffect } from 'react';
import { toast } from "sonner"; // Dari shadcn/ui

export function RateLimitToast({ message, retryAfter }: { 
  message: string, 
  retryAfter?: number 
}) {
  useEffect(() => {
    toast.error(message, {
      description: retryAfter 
        ? `Coba lagi dalam ${retryAfter} detik` 
        : undefined,
      duration: 4000,
    });
  }, [message, retryAfter]);

  return null;
}