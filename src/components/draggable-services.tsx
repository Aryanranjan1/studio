'use client';

import { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { cn } from '@/lib/utils';

interface DraggableServicesProps {
  items?: string[];
  className?: string;
}

const DEFAULT_SKILLS = [
  'Web Design',
  'Development',
  'Mobile App',
  'Automation',
  'SEO',
  'UI/UX',
  'Webflow',
  'Framer',
];

export function DraggableServices({ items = DEFAULT_SKILLS, className }: DraggableServicesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const bodiesRef = useRef<Matter.Body[]>([]);
  const itemElementsRef = useRef<NodeListOf<HTMLDivElement> | null>(null);


  useEffect(() => {
    const containerElement = containerRef.current;
    if (!containerElement) return;

    // --- Matter.js Setup ---
    const { Engine, World, Bodies, Mouse, MouseConstraint, Composite } = Matter;
    const engine = Engine.create();
    engineRef.current = engine;
    const world = engine.world;
    engine.gravity.y = 0.4;

    const createBoundaries = (width: number, height: number) => {
      // First, remove any existing boundaries to avoid duplication
      const oldBoundaries = world.bodies.filter(body => body.label?.includes('boundary'));
      World.remove(world, oldBoundaries);
      
      const thickness = 100;
      const options: Matter.IChamferableBodyDefinition = {
        isStatic: true,
        render: { fillStyle: 'transparent' },
        friction: 1, // High friction for boundaries
      };

      World.add(world, [
        // Ground
        Bodies.rectangle(width / 2, height + thickness / 2, width + thickness * 2, thickness, { ...options, label: 'boundary_ground' }),
        // Left Wall
        Bodies.rectangle(-thickness / 2, height / 2, thickness, height, { ...options, label: 'boundary_wallLeft' }),
        // Right Wall
        Bodies.rectangle(width + thickness / 2, height / 2, thickness, height, { ...options, label: 'boundary_wallRight' }),
         // Roof
        Bodies.rectangle(width / 2, -thickness / 2, width + thickness * 2, thickness, { ...options, label: 'boundary_roof' }),
      ]);
    };

    let { width, height } = containerElement.getBoundingClientRect();
    createBoundaries(width, height);
    
    // --- Body Creation ---
    itemElementsRef.current = containerElement.querySelectorAll('[data-letter]') as NodeListOf<HTMLDivElement>;
    
    bodiesRef.current = Array.from(itemElementsRef.current).map((el) => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const body = Bodies.rectangle(
        // Spawn in a random position within the container
        width / 4 + Math.random() * (width / 2),
        height / 4 + Math.random() * (height / 2),
        w,
        h,
        {
          chamfer: { radius: h / 2 }, // Make them pill-shaped
          density: 0.01,
          friction: 0.1,
          frictionAir: 0.01,
          restitution: 0.6, // Bounciness
        }
      );
      return body;
    });

    World.add(world, bodiesRef.current);
    
    // --- Mouse Interaction ---
    const mouse = Mouse.create(containerElement);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2, // Makes dragging feel more "springy"
        render: { visible: false },
      },
    });
    World.add(world, mouseConstraint);
    
    // --- Manual Animation Loop ---
    const animationLoop = () => {
      // Update the physics engine
      Engine.update(engine, 1000 / 60);
      
      // Sync HTML element positions with physics body positions
      if(itemElementsRef.current) {
        bodiesRef.current.forEach((body, i) => {
          const el = itemElementsRef.current![i];
          if (el) {
            el.style.transform = `translate(${body.position.x - el.offsetWidth / 2}px, ${
              body.position.y - el.offsetHeight / 2
            }px) rotate(${body.angle}rad)`;
          }
        });
      }
      animationFrameRef.current = requestAnimationFrame(animationLoop);
    };
    animationLoop();
    
    // --- Resize Handler ---
    const handleResize = () => {
      if (containerElement) {
        const newBounds = containerElement.getBoundingClientRect();
        width = newBounds.width;
        height = newBounds.height;
        createBoundaries(width, height);
      }
    };
    window.addEventListener('resize', handleResize);

    // --- CRITICAL Cleanup ---
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
      
      const currentEngine = engineRef.current;
      if (currentEngine) {
        World.clear(currentEngine.world, false); // Clear the world
        Engine.clear(currentEngine); // Clear the engine
        engineRef.current = null;
      }
      bodiesRef.current = [];
    };
  }, [items]); // Rerun effect if items prop changes

  const colorClasses = [
    'bg-primary text-primary-foreground', // Purple
    'bg-white text-black', // White
    'bg-[#0e0e11] text-white border border-neutral-700', // Dark Grey
  ];

  return (
    <div ref={containerRef} className={cn('w-full h-full relative overflow-hidden', className)}>
      {items.map((item, index) => (
        <div
          key={index}
          data-letter={item}
          className={cn(
            'absolute flex items-center justify-center rounded-full cursor-grab active:cursor-grabbing',
            'p-1 px-3 text-xs md:p-2 md:px-4 md:text-sm font-semibold',
            'pointer-events-none', // This is crucial for mouse events to pass through
            colorClasses[index % colorClasses.length]
          )}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
