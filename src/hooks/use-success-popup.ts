"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { SuccessPopup } from '@/components/success-popup';

interface SuccessContextType {
  showSuccessPopup: (message: string) => void;
}

const SuccessContext = createContext<SuccessContextType | undefined>(undefined);

export const SuccessPopupProvider = ({ children }: { children: ReactNode }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const showSuccessPopup = useCallback((message: string) => {
    setPopupMessage(message);
    setIsPopupOpen(true);
    setTimeout(() => {
      setIsPopupOpen(false);
    }, 2000); // Popup will disappear after 2 seconds
  }, []);

  return React.createElement(
    SuccessContext.Provider,
    { value: { showSuccessPopup } },
    children,
    React.createElement(SuccessPopup, { isOpen: isPopupOpen, message: popupMessage })
  );
};

export const useSuccessPopup = (): SuccessContextType => {
  const context = useContext(SuccessContext);
  if (context === undefined) {
    throw new Error('useSuccessPopup must be used within a SuccessPopupProvider');
  }
  return context;
};
