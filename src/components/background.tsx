"use client";

import { useTheme } from "next-themes";
import { SparklesCore } from "@/components/ui/sparkles";
import { useEffect, useState } from "react";

export function Background() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

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
