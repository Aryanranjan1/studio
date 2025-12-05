'use client';
import React, { useEffect, useRef, useState } from "react";

/* ----- Config / Data ----- */
const SKILLS = [
    { id: "web-design", label: "Web Design", color: "#e5ecfc" },
    { id: "development", label: "Development", color: "#e2f9e5" },
    { id: "mobile-app", label: "Mobile App", color: "#fff0e2" },
    { id: "automation", label: "Automation", color: "#fce2e2" },
    { id: "seo", label: "SEO", color: "#f5e2fc" },
    { id: "ui-ux", label: "UI/UX", color: "#e2fcfc" },
    { id: "webflow", label: "Webflow", color: "#fcfce2" },
    { id: "framer", label: "Framer", color: "#e2eafc" }
] as const;

type Skill = typeof SKILLS[number];

type Particle = {
  id: string;
  label: string;
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number; // radius for sizing, not collision
  width: number;
  height: number;
  mass: number;
  el?: HTMLDivElement | null;
  picking?: boolean;
  ariaGrabbed?: boolean;
  lastPointerTS?: number;
  lastPointerX?: number;
  lastPointerY?: number;
};

/* Physics & tuning */
const DEFAULTS = {
  gravity: 900, // px/s^2
  friction: 0.995,
  wallBounce: 0.85,
  maxVelocity: 1600,
  restitution: 0.5 // collision elasticity
};

/* Utility */
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

/* ----- Component ----- */
export function DraggableServices({
  className = "",
  style,
  gravity = DEFAULTS.gravity,
  friction = DEFAULTS.friction,
  wallBounce = DEFAULTS.wallBounce,
  maxVelocity = DEFAULTS.maxVelocity
}: {
  services: string[]; // This prop is not used but kept for interface consistency
  className?: string;
  style?: React.CSSProperties;
  gravity?: number;
  friction?: number;
  wallBounce?: number;
  maxVelocity?: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const draggingRef = useRef<{ id: string | null }>({ id: null });
  const [, setTick] = useState(0); // force initial render to attach refs

  /* Responsive sizing parameters based on container */
  const computeSizes = (w: number, h: number) => {
    const S = Math.min(w, h);
    const r = clamp(S * 0.1, 40, 90);
    const width = r * 2.2;
    const height = r * 0.9;
    const fontSize = Math.max(10, Math.round(r * 0.21));
    return { r, width, height, fontSize };
  };

  /* Initialize particles & positions */
  useEffect(() => {
    const container = containerRef.current!;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const { r, width, height } = computeSizes(rect.width, rect.height);

    const centerX = rect.width / 2;
    const centerY = rect.height / 3;

    const particles: Particle[] = SKILLS.map((s, i) => {
      // spawn with slight offset so they don't perfectly overlap
      const angle = (i / SKILLS.length) * Math.PI * 2;
      const spread = Math.min(rect.width, rect.height) * 0.15;
      const x = clamp(centerX + Math.cos(angle) * spread, width/2, rect.width - width/2);
      const y = clamp(centerY + Math.sin(angle) * spread, height/2, rect.height - height/2);

      return {
        id: s.id,
        label: s.label,
        color: s.color,
        x,
        y,
        vx: (Math.random() - 0.5) * 120,
        vy: (Math.random() - 0.5) * 40,
        r,
        width,
        height,
        mass: width * height * 0.001,
        el: null,
        picking: false,
        ariaGrabbed: false
      };
    });

    particlesRef.current = particles;
    setTick(t => t + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Resize handler - recompute sizes & clamp positions */
  useEffect(() => {
    const onResize = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const { r, width, height, fontSize } = computeSizes(rect.width, rect.height);
      for (const p of particlesRef.current) {
        p.r = r;
        p.width = width;
        p.height = height;
        p.mass = width * height * 0.001;
        p.x = clamp(p.x, p.width / 2, rect.width - p.width / 2);
        p.y = clamp(p.y, p.height / 2, rect.height - p.height / 2);
        if (p.el) {
          p.el.style.width = `${p.width}px`;
          p.el.style.height = `${p.height}px`;
          p.el.style.borderRadius = `999px`;
           const span = p.el.querySelector("span") as HTMLElement | null;
            if (span) {
              span.style.fontSize = `${fontSize}px`;
            }
        }
      }
    };
    onResize();
    const ro = new ResizeObserver(onResize);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* Physics loop */
  useEffect(() => {
    const step = (time: number) => {
      const last = lastTimeRef.current ?? time;
      const dt = Math.min(0.05, (time - last) / 1000);
      lastTimeRef.current = time;

      const container = containerRef.current;
      if (!container) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const particles = particlesRef.current;

      // integrate
      for (const p of particles) {
        if (p.picking) {
          p.vx *= 0.9;
          p.vy *= 0.9;
          continue;
        }
        p.vy += gravity * dt;
        p.vx *= Math.pow(friction, dt * 60);
        p.vy *= Math.pow(friction, dt * 60);

        const speed = Math.hypot(p.vx, p.vy);
        if (speed > maxVelocity) {
          const s = maxVelocity / speed;
          p.vx *= s;
          p.vy *= s;
        }

        p.x += p.vx * dt;
        p.y += p.vy * dt;
      }

      // collisions (AABB - Axis-Aligned Bounding Box)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];

          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const halfWidths = (a.width + b.width) / 2;
          const halfHeights = (a.height + b.height) / 2;
          
          if (Math.abs(dx) < halfWidths && Math.abs(dy) < halfHeights) {
              const overlapX = halfWidths - Math.abs(dx);
              const overlapY = halfHeights - Math.abs(dy);

              // Separate them along the axis of least penetration
              if (overlapX < overlapY) {
                  const sign = Math.sign(dx);
                  if (!a.picking) a.x -= (overlapX / 2) * sign;
                  if (!b.picking) b.x += (overlapX / 2) * sign;

                  // Collision response
                  const vRel = b.vx - a.vx;
                  const impulse = (-(1 + DEFAULTS.restitution) * vRel) / (1/a.mass + 1/b.mass);
                  if (!a.picking) a.vx -= impulse / a.mass;
                  if (!b.picking) b.vx += impulse / b.mass;
              } else {
                  const sign = Math.sign(dy);
                  if (!a.picking) a.y -= (overlapY / 2) * sign;
                  if (!b.picking) b.y += (overlapY / 2) * sign;

                  // Collision response
                  const vRel = b.vy - a.vy;
                  const impulse = (-(1 + DEFAULTS.restitution) * vRel) / (1/a.mass + 1/b.mass);
                  if (!a.picking) a.vy -= impulse / a.mass;
                  if (!b.picking) b.vy += impulse / b.mass;
              }
          }
        }
      }

      // wall collisions
      for (const p of particles) {
        if (p.x - p.width / 2 < 0) {
          p.x = p.width / 2;
          p.vx = -p.vx * wallBounce;
        } else if (p.x + p.width / 2 > w) {
          p.x = w - p.width / 2;
          p.vx = -p.vx * wallBounce;
        }
        if (p.y - p.height / 2 < 0) {
          p.y = p.height / 2;
          p.vy = -p.vy * wallBounce;
        } else if (p.y + p.height / 2 > h) {
          p.y = h - p.height / 2;
          p.vy = -p.vy * wallBounce;
        }
      }

      // write to DOM
      for (const p of particles) {
        if (p.el) {
          const tx = Math.round(p.x - p.width / 2);
          const ty = Math.round(p.y - p.height / 2);
          p.el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTimeRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gravity, friction, wallBounce, maxVelocity]);

  /* Pointer handling for drag */
  useEffect(() => {
    const onPointerMoveGlobal = (e: PointerEvent) => {
      const id = draggingRef.current.id;
      if (id == null) return;
      const p = particlesRef.current.find(x => x.id === id);
      if (!p) return;
      const container = containerRef.current!;
      const rect = container.getBoundingClientRect();
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;

      if (p.lastPointerX != null) {
        const dt = Math.max(1 / 60, ((e.timeStamp - (p.lastPointerTS || e.timeStamp)) / 1000) || 1 / 60);
        const vx = (localX - p.lastPointerX) / dt;
        const vy = (localY - p.lastPointerY) / dt;
        p.vx = vx * 0.9;
        p.vy = vy * 0.9;
        p.lastPointerTS = e.timeStamp;
      } else {
        p.lastPointerTS = e.timeStamp;
      }
      p.lastPointerX = localX;
      p.lastPointerY = localY;

      p.x = clamp(localX, p.width / 2, rect.width - p.width / 2);
      p.y = clamp(localY, p.height / 2, rect.height - p.height / 2);
    };

    const onPointerUpGlobal = (_e: PointerEvent) => {
      const id = draggingRef.current.id;
      if (id == null) return;
      const p = particlesRef.current.find(x => x.id === id);
      if (!p) return;
      p.picking = false;
      p.ariaGrabbed = false;
      p.lastPointerX = undefined;
      p.lastPointerY = undefined;
      p.lastPointerTS = undefined;
      draggingRef.current.id = null;
      p.vx *= 1.02;
      p.vy *= 1.02;
      window.removeEventListener("pointermove", onPointerMoveGlobal);
      window.removeEventListener("pointerup", onPointerUpGlobal);
    };

    return () => {
      window.removeEventListener("pointermove", onPointerMoveGlobal);
      window.removeEventListener("pointerup", onPointerUpGlobal);
    };
  }, []);

  const attachRef = (p: Particle) => (el: HTMLDivElement | null) => {
    p.el = el;
    if (!el) return;
    const { fontSize } = computeSizes(containerRef.current?.clientWidth ?? 0, containerRef.current?.clientHeight ?? 0);

    el.style.width = `${p.width}px`;
    el.style.height = `${p.height}px`;
    el.style.borderRadius = `999px`;
    const span = el.querySelector("span") as HTMLElement | null;
    if (span) {
      span.style.fontSize = `${fontSize}px`;
    }

    el.style.transform = `translate3d(${Math.round(p.x - p.width / 2)}px, ${Math.round(p.y - p.height / 2)}px, 0)`;

    const onPointerDown = (ev: PointerEvent) => {
      ev.preventDefault();
      const container = containerRef.current!;
      const rect = container.getBoundingClientRect();
      const lx = ev.clientX - rect.left;
      const ly = ev.clientY - rect.top;
      p.picking = true;
      p.ariaGrabbed = true;
      p.lastPointerX = lx;
      p.lastPointerY = ly;
      p.lastPointerTS = ev.timeStamp;
      draggingRef.current.id = p.id;

      const onPointerMoveGlobal = (e: PointerEvent) => {
        const localX = e.clientX - rect.left;
        const localY = e.clientY - rect.top;
        if (p.lastPointerX != null) {
          const dt = Math.max(1 / 60, ((e.timeStamp - (p.lastPointerTS || e.timeStamp)) / 1000) || 1 / 60);
          const vx = (localX - p.lastPointerX) / dt;
          const vy = (localY - p.lastPointerY) / dt;
          p.vx = vx * 0.9;
          p.vy = vy * 0.9;
          p.lastPointerTS = e.timeStamp;
        }
        p.lastPointerX = localX;
        p.y = clamp(localY, p.height / 2, rect.height - p.height / 2);
      };

      const onPointerUpGlobal = (e: PointerEvent) => {
        p.picking = false;
        p.ariaGrabbed = false;
        p.lastPointerX = undefined;
        p.lastPointerY = undefined;
        p.lastPointerTS = undefined;
        draggingRef.current.id = null;
        p.vx *= 1.02;
        p.vy *= 1.02;
        try {
          el.releasePointerCapture(ev.pointerId);
        } catch (err) {}
        window.removeEventListener("pointermove", onPointerMoveGlobal);
        window.removeEventListener("pointerup", onPointerUpGlobal);
      };

      try {
        el.setPointerCapture(ev.pointerId);
      } catch (err) {}
      window.addEventListener("pointermove", onPointerMoveGlobal);
      window.addEventListener("pointerup", onPointerUpGlobal);
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.tabIndex = 0;
    el.addEventListener("keydown", (ev: KeyboardEvent) => {
      if (ev.key === " " || ev.key === "Enter") {
        ev.preventDefault();
        p.picking = !p.picking;
        p.ariaGrabbed = p.picking;
        if (!p.picking) {
          p.vx *= 1.02;
          p.vy *= 1.02;
        }
      } else if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(ev.key)) {
        const nudge = 8;
        if (ev.key === "ArrowUp") p.y -= nudge;
        if (ev.key === "ArrowDown") p.y += nudge;
        if (ev.key === "ArrowLeft") p.x -= nudge;
        if (ev.key === "ArrowRight") p.x += nudge;
      }
    });

    (el as any)._cleanup = () => {
      el.removeEventListener("pointerdown", onPointerDown);
    };
  };

  /* Render */
  const particles = particlesRef.current;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: '100%',
        minHeight: 200,
        overflow: "hidden",
        touchAction: "none",
        userSelect: "none",
        ...style
      }}
      aria-label="Skill pills playground"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          ref={attachRef(p)}
          role="button"
          aria-label={`${p.label} skill`}
          aria-grabbed={p.ariaGrabbed ? "true" : "false"}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            transform: `translate3d(${Math.round(p.x - p.width / 2)}px, ${Math.round(p.y - p.height / 2)}px, 0)`,
            width: `${p.width}px`,
            height: `${p.height}px`,
            borderRadius: `999px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "6px 12px",
            boxSizing: "border-box",
            fontSize: "14px",
            fontWeight: 700,
            whiteSpace: "nowrap",
            pointerEvents: "auto",
            cursor: p.picking ? "grabbing" : "grab",
            background: `linear-gradient(135deg, ${p.color}, ${shade(p.color, -18)})`,
            color: getTextColorForBg(p.color),
            boxShadow: p.picking
              ? "0 14px 36px rgba(0,0,0,0.45)"
              : "0 8px 20px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.03)",
            transition: "box-shadow 0.12s ease"
          }}
        >
          <span style={{ transform: "translateY(-1px)", pointerEvents: "none" }}>{p.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ----- Helpers for colors ----- */

function getTextColorForBg(hex: string) {
  const c = hexToRgb(hex);
  if (!c) return "#000";
  const lum = (0.2126 * srgb(c.r) + 0.7152 * srgb(c.g) + 0.0722 * srgb(c.b));
  return lum > 0.6 ? "#000000" : "#fff";
}
function srgb(v: number) {
  v /= 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}
function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  if (h.length === 3) {
    return {
      r: parseInt(h[0] + h[0], 16),
      g: parseInt(h[1] + h[1], 16),
      b: parseInt(h[2] + h[2], 16)
    };
  } else if (h.length === 6) {
    return {
      r: parseInt(h.substring(0, 2), 16),
      g: parseInt(h.substring(2, 4), 16),
      b: parseInt(h.substring(4, 6), 16)
    };
  }
  return null;
}

function shade(hex: string, percent: number) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const amt = Math.round((percent / 100) * 255);
  const r = clamp(rgb.r + amt, 0, 255);
  const g = clamp(rgb.g + amt, 0, 255);
  const b = clamp(rgb.b + amt, 0, 255);
  return `rgb(${r}, ${g}, ${b})`;
}

    