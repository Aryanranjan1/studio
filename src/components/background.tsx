"use client";

import { useTheme } from "next-themes";
import { SparklesCore } from "@/components/ui/sparkles";

export function Background() {
    const { theme } = useTheme();

    return (
        <div className="w-full fixed inset-0 h-screen z-0">
            {theme === 'dark' ? (
                <SparklesCore
                    id="tsparticles"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={120}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />
            ) : (
                <SparklesCore
                    id="tsparticles-light"
                    background="transparent"
                    minSize={1}
                    maxSize={1.5}
                    particleDensity={30}
                    className="w-full h-full"
                    particleColor="#9333ea"
                />
            )}
        </div>
    )
}
