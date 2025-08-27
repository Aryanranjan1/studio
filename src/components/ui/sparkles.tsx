// Inspired by https://bg.ibelick.com/
"use client";
import React, { useEffect, useState } from "react";
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import type { Container } from "@tsparticles/engine";

export const SparklesCore = (props: {
  id: string;
  background: string;
  minSize: number;
  maxSize: number;
  particleDensity: number;
  className: string;
  particleColor: string;
}) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticles();
  }, []);

  const initParticles = async () => {
    await loadSlim(tsParticles);
    setInit(true);
  };

  useEffect(() => {
    if (init) {
      tsParticles.load({
        id: props.id,
        options: {
          background: {
            color: {
              value: props.background,
            },
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: props.particleColor,
            },
            links: {
              color: props.particleColor,
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
              },
              value: props.particleDensity,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: props.minSize, max: props.maxSize },
            },
          },
          detectRetina: true,
        },
      });
    }
  }, [init, props]);

  return <div className={props.className} id={props.id}></div>;
};
