// Inspired by https://bg.ibelick.com/
"use client";
import React, { useEffect, useState } from "react";
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

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
              onHover: {
                enable: true,
                mode: "bubble",
              },
              onClick: {
                enable: true,
                mode: "push",
              },
            },
            modes: {
              bubble: {
                distance: 100,
                duration: 2,
                opacity: 0.8,
                size: 6,
              },
              push: {
                quantity: 1,
                particles_nb: 1,
              }
            },
          },
          particles: {
            color: {
              value: props.particleColor,
            },
            links: {
              color: props.particleColor,
              distance: 150,
              enable: false,
              opacity: 0.2,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "out",
              },
              random: true,
              speed: 0.1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
              },
              value: props.particleDensity,
            },
            opacity: {
              value: {min: 0.1, max: 0.5},
              animation: {
                enable: true,
                speed: 1,
                minimumValue: 0.1,
                sync: false,
              },
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: props.minSize, max: props.maxSize },
              animation: {
                enable: true,
                speed: 3,
                minimumValue: 0.1,
                sync: false
              }
            },
            // Shooting stars
            emitters: {
              direction: "top-right",
              rate: {
                delay: 0.1,
                quantity: 1
              },
              position: {
                x: 0,
                y: 50
              },
              size: {
                width: 0,
                height: 0
              },
              particles: {
                move: {
                  speed: 10,
                  direction: "top-right",
                  straight: true,
                  outModes: {
                    default: "destroy"
                  }
                },
                size: {
                  value: 2
                },
                opacity: {
                  value: 1,
                  animation: {
                    enable: true,
                    speed: 1,
                    minimumValue: 0,
                    startValue: "max",
                    destroy: "min"
                  }
                }
              }
            }
          },
          detectRetina: true,
        },
      });
    }
  }, [init, props]);

  return <div className={props.className} id={props.id}></div>;
};
