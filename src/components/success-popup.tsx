"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface SuccessPopupProps {
  isOpen: boolean;
  message: string;
}

export function SuccessPopup({ isOpen, message }: SuccessPopupProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm',
        'transition-opacity duration-300 ease-in-out',
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <div
        className={cn(
          'flex flex-col items-center gap-4 rounded-xl bg-background p-8 text-center shadow-2xl',
          'transition-transform duration-300 ease-in-out',
          isOpen ? 'scale-100' : 'scale-90'
        )}
      >
        <div className="h-20 w-20">
          <svg
            className="h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="success-checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="success-checkmark__check"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeMiterlimit="10"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>
        <p className="text-xl font-semibold text-foreground">{message}</p>
      </div>
    </div>
  );
}
