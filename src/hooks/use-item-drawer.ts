
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Project, Service } from '@/lib/data';
import { useLenis } from 'lenis/react';

type DrawerItem = Project | Service;

interface ItemDrawerContextType {
  isOpen: boolean;
  item: DrawerItem | null;
  showItem: (item: DrawerItem) => void;
  closeItem: () => void;
}

const ItemDrawerContext = createContext<ItemDrawerContextType | undefined>(undefined);

export const ItemDrawerProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState<DrawerItem | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [isOpen, lenis]);

  const showItem = (newItem: DrawerItem) => {
    setItem(newItem);
    setIsOpen(true);
  };

  const closeItem = () => {
    setIsOpen(false);
    // No need for a timeout here, the sheet's onOpenChange handles the state.
    // The item state will clear when the sheet is fully closed.
  };

  return React.createElement(
    ItemDrawerContext.Provider,
    { value: { isOpen, item, showItem, closeItem } },
    children
  );
};

export const useItemDrawer = (): ItemDrawerContextType => {
  const context = useContext(ItemDrawerContext);
  if (context === undefined) {
    throw new Error('useItemDrawer must be used within an ItemDrawerProvider');
  }
  return context;
};
