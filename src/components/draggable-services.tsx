
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
  const itemElementsRef = useRef<(HTMLDivElement | null)[]>([]);


  useEffect(() => {
    const containerElement = containerRef.current;
    if (!containerElement) return;

    // --- Matter.js Setup ---
    const { Engine, World, Bodies, Mouse, MouseConstraint, Composite } = Matter;
    const engine = Engine.create();
    engineRef.current = engine;
    const world = engine.world;
    engine.gravity.y = 0.2; // Slightly reduced gravity

    const createBoundaries = (width: number, height: number) => {
      const oldBoundaries = world.bodies.filter(body => body.label?.includes('boundary'));
      World.remove(world, oldBoundaries);
      
      const thickness = 100;
      const options: Matter.IChamferableBodyDefinition = {
        isStatic: true,
        render: { fillStyle: 'transparent' },
        friction: 1,
        restitution: 0.8, // Make boundaries a bit more bouncy
      };

      World.add(world, [
        Bodies.rectangle(width / 2, height + thickness / 2, width + thickness * 2, thickness, { ...options, label: 'boundary_ground' }),
        Bodies.rectangle(-thickness / 2, height / 2, thickness, height, { ...options, label: 'boundary_wallLeft' }),
        Bodies.rectangle(width + thickness / 2, height / 2, thickness, height, { ...options, label: 'boundary_wallRight' }),
        Bodies.rectangle(width / 2, -thickness / 2, width + thickness * 2, thickness, { ...options, label: 'boundary_roof' }),
      ]);
    };

    let { width, height } = containerElement.getBoundingClientRect();
    createBoundaries(width, height);
    
    // --- Body Creation ---
    bodiesRef.current = items.map((_, index) => {
      const el = itemElementsRef.current[index];
      if (!el) return null;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const body = Bodies.rectangle(
        width / 4 + Math.random() * (width / 2),
        height / 4 + Math.random() * (height / 2),
        w,
        h,
        {
          chamfer: { radius: h / 2 },
          density: 0.02, // Slightly increase density
          friction: 0.05, // Increase friction
          frictionAir: 0.02, // Increase air friction for slower movement
          restitution: 0.6,
        }
      );
      return body;
    }).filter(Boolean) as Matter.Body[];

    World.add(world, bodiesRef.current);
    
    // --- Mouse Interaction ---
    const mouse = Mouse.create(containerElement);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.1, // Softer grip
        render: { visible: false },
      },
    });
    World.add(world, mouseConstraint);
    
    // --- Animation Loop ---
    const animationLoop = () => {
      Engine.update(engine, 1000 / 60);
      
      bodiesRef.current.forEach((body, i) => {
        const el = itemElementsRef.current[i];
        if (el) {
          el.style.transform = `translate(${body.position.x - el.offsetWidth / 2}px, ${
            body.position.y - el.offsetHeight / 2
          }px) rotate(${body.angle}rad)`;
        }
      });
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

    // --- Cleanup ---
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
      
      const currentEngine = engineRef.current;
      if (currentEngine) {
        World.clear(currentEngine.world, false);
        Engine.clear(currentEngine);
        engineRef.current = null;
      }
      bodiesRef.current = [];
    };
  }, [items]);

  const colorClasses = [
    'bg-primary text-primary-foreground', // Solid primary
    'bg-transparent text-white border border-neutral-700', // Outline
    'bg-white/10 text-white backdrop-blur-sm border border-white/20', // Glassmorphism
    'bg-secondary text-secondary-foreground', // Solid secondary
  ];

  return (
    <div ref={containerRef} className={cn('w-full h-full relative overflow-hidden', className)}>
      {items.map((item, index) => (
        <div
          key={index}
          ref={el => itemElementsRef.current[index] = el}
          className={cn(
            'absolute flex items-center justify-center rounded-full cursor-grab active:cursor-grabbing',
            'px-4 py-2 text-sm font-semibold transition-colors duration-300', // Uniform padding
            'pointer-events-auto',
            colorClasses[index % colorClasses.length]
          )}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
