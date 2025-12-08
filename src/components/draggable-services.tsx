'use client';
import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import { cn } from "@/lib/utils";

const SKILLS = [
    { id: "web-design", label: "Web Design" },
    { id: "development", label: "Development" },
    { id: "mobile-app", label: "Mobile App" },
    { id: "automation", label: "Automation" },
    { id: "seo", label: "SEO" },
    { id: "ui-ux", label: "UI/UX" },
    { id: "webflow", label: "Webflow" },
    { id: "framer", label: "Framer" }
] as const;

export function DraggableServices({
  className = "",
  style,
}: {
  services: string[];
  className?: string;
  style?: React.CSSProperties;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const tagElementsRef = useRef<{ body: Matter.Body; element: HTMLDivElement }[]>([]);

  useEffect(() => {
    const containerElement = containerRef.current;
    if (!containerElement) return;

    const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      Events = Matter.Events,
      Composite = Matter.Composite;

    const engine = Engine.create();
    engineRef.current = engine;
    const world = engine.world;

    // Engine Configuration
    engine.world.gravity.y = 0.6;
    engine.constraintIterations = 3;
    engine.positionIterations = 8;
    engine.velocityIterations = 6;

    const containerWidth = containerElement.clientWidth;
    const containerHeight = containerElement.clientHeight;

    const render = Render.create({
      element: containerElement,
      engine: engine,
      options: {
        width: containerWidth,
        height: containerHeight,
        background: "transparent",
        wireframes: false,
      },
    });
    renderRef.current = render;

    if (render.canvas) {
      render.canvas.style.position = "absolute";
      render.canvas.style.top = "0";
      render.canvas.style.left = "0";
      render.canvas.style.width = "100%";
      render.canvas.style.height = "100%";
      render.canvas.style.zIndex = "0";
      render.canvas.style.pointerEvents = "auto";
    }

    Render.run(render);
    Engine.run(engine);

    const createBoundaries = (world: Matter.World, width: number, height: number) => {
        const bodies = Composite.allBodies(world);
        bodies.forEach((body) => {
            if (body.isStatic && body.label !== "MouseConstraint") {
                World.remove(world, body);
            }
        });
        const thickness = 100;
        const options = {
            isStatic: true,
            render: { fillStyle: "transparent" },
        };
        World.add(world, [
            Bodies.rectangle(width / 2, height + thickness / 2, width + thickness * 2, thickness, { ...options, label: "ground" }),
            Bodies.rectangle(-thickness / 2, height / 2, thickness, height + thickness * 2, { ...options, label: "wallLeft" }),
            Bodies.rectangle(width + thickness / 2, height / 2, thickness, height + thickness * 2, { ...options, label: "wallRight" }),
            Bodies.rectangle(width / 2, -thickness / 2, width + thickness * 2, thickness, { ...options, label: "roof" }),
        ]);
    };

    createBoundaries(world, containerWidth, containerHeight);

    const tagElements = containerElement.querySelectorAll(".tag") as NodeListOf<HTMLDivElement>;
    tagElementsRef.current = Array.from(tagElements).map((tagEl) => {
      const width = tagEl.offsetWidth;
      const height = tagEl.offsetHeight;

      const hitBoxWidth = width + 4;
      const hitBoxHeight = height + 4;

      const margin = 60;
      const x = Math.random() * (containerWidth - width - margin * 2) + width / 2 + margin;
      const y = Math.random() * (containerHeight - height - margin * 2) + height / 2 + margin;

      const body = Bodies.rectangle(x, y, hitBoxWidth, hitBoxHeight, {
        chamfer: { radius: height / 2 },
        density: 0.008,
        friction: 0.3,
        frictionAir: 0.02,
        restitution: 0.4,
        render: { fillStyle: "transparent" },
      });
      World.add(world, body);
      return { body, element: tagEl };
    });

    Events.on(engine, "afterUpdate", () => {
      const maxVelocity = 15;
      const margin = 50;

      tagElementsRef.current.forEach(({ body, element }) => {
        const { x, y } = body.position;
        const angle = body.angle;
        element.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle}rad)`;

        if (x < -margin || x > containerWidth + margin || y < -margin || y > containerHeight + margin) {
          Matter.Body.setPosition(body, {
            x: containerWidth / 2 + (Math.random() - 0.5) * 100,
            y: containerHeight / 4 + Math.random() * 100,
          });
          Matter.Body.setVelocity(body, { x: 0, y: 0 });
          Matter.Body.setAngularVelocity(body, 0);
        }

        if (body.velocity.x > maxVelocity) Matter.Body.setVelocity(body, { x: maxVelocity, y: body.velocity.y });
        if (body.velocity.x < -maxVelocity) Matter.Body.setVelocity(body, { x: -maxVelocity, y: body.velocity.y });
        if (body.velocity.y > maxVelocity) Matter.Body.setVelocity(body, { x: body.velocity.x, y: maxVelocity });
        if (body.velocity.y < -maxVelocity) Matter.Body.setVelocity(body, { x: body.velocity.x, y: -maxVelocity });
      });
    });

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.15,
        render: { visible: false },
      },
    });
    World.add(world, mouseConstraint);

    const handleResize = () => {
        if (!renderRef.current) return;
        const newWidth = containerElement.clientWidth;
        const newHeight = containerElement.clientHeight;

        renderRef.current.canvas.width = newWidth;
        renderRef.current.canvas.height = newHeight;
        renderRef.current.options.width = newWidth;
        renderRef.current.options.height = newHeight;

        createBoundaries(world, newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (renderRef.current) {
        Render.stop(renderRef.current);
        World.clear(renderRef.current.engine.world, false);
        Engine.clear(renderRef.current.engine);
        renderRef.current.canvas.remove();
        renderRef.current = null;
      }
      if (engineRef.current) {
        Engine.clear(engineRef.current);
        engineRef.current = null;
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const pillColors = [
    'bg-primary text-primary-foreground',
    'bg-secondary text-secondary-foreground',
    'bg-muted text-muted-foreground',
    'bg-primary/70 text-primary-foreground',
    'bg-secondary/70 text-secondary-foreground',
    'bg-muted/70 text-muted-foreground',
  ];

  return (
    <div
      ref={containerRef}
      className={cn("w-full h-full relative overflow-hidden", className)}
      style={style}
    >
      {SKILLS.map((skill, i) => (
        <div
          key={skill.id}
          className={cn(
            "tag absolute flex items-center justify-center p-2 rounded-full cursor-grab active:cursor-grabbing text-sm md:text-base",
            "transform -translate-x-1/2 -translate-y-1/2", // Initial centering for JS calculation
            "pointer-events-none z-10", // Visible tags don't get mouse events
            pillColors[i % pillColors.length]
          )}
        >
          <span>{skill.label}</span>
        </div>
      ))}
    </div>
  );
}
