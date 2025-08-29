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
        const isLight = props.id.includes('light');
        const options = isLight
          ? { // Light mode options - constellation effect
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
                    mode: "grab",
                  },
                },
                modes: {
                  grab: {
                    distance: 140,
                    links: {
                      opacity: 1,
                    },
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
                collisions: {
                  enable: true,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: {
                    default: "bounce",
                  },
                  random: false,
                  speed: 0.5,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                  },
                  value: 80,
                },
                opacity: {
                  value: 0.5,
                },
                shape: {
                  type: "circle",
                },
                size: {
                  value: { min: 1, max: 5 },
                },
              },
              detectRetina: true,
            }
          : { // Dark mode options
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
                  }
                },
                modes: {
                  bubble: {
                    distance: 150,
                    size: 4,
                    duration: 2,
                    opacity: 0.8,
                  },
                  push: {
                    quantity: 4,
                  }
                },
              },
              particles: {
                color: {
                  value: props.particleColor,
                },
                links: {
                  enable: false,
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
              },
              detectRetina: true,
              emitters: {
                direction: "top-right",
                rate: {
                  delay: 3.5,
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
                    direction: "none",
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
            };

      tsParticles.load({ id: props.id, options });
    }
  }, [init, props]);

  return <div className={props.className} id={props.id}></div>;
};
