"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
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

  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }

    return () => {
      body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const showItem = (newItem: DrawerItem) => {
    setItem(newItem);
    setIsOpen(true);
  };

  const closeItem = () => {
    setIsOpen(false);
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
