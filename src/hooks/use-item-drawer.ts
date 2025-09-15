
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Project, Service } from '@/lib/data';

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

  const showItem = (newItem: DrawerItem) => {
    setItem(newItem);
    setIsOpen(true);
  };

  const closeItem = () => {
    setIsOpen(false);
    // Optional: Delay clearing item to allow for exit animation
    // By checking the new state via the function's parameter, we avoid stale closures.
    setTimeout(() => {
        setIsOpen((currentIsOpen) => {
            if (!currentIsOpen) {
                setItem(null);
            }
            return currentIsOpen;
        });
    }, 300);
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
