"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function InputWithButton() {
  return (
    <div className="flex w-full items-center space-x-2 rounded-full bg-background p-1 border border-border">
      <Input
        type="email"
        placeholder="Enter your email"
        className="flex-1 border-0 bg-transparent px-4 py-2 text-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <Button type="submit" className="rounded-full">
        Subscribe
      </Button>
    </div>
  )
}
