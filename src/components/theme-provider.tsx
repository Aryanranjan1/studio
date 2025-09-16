
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { ReactLenis } from "@studio-freight/react-lenis"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ReactLenis root>{children}</ReactLenis>
    </NextThemesProvider>
  )
}
