'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Button } from './ui/button';
import Link from 'next/link';

export function WireframeHero() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !canvasRef.current) return;

    const container = canvasRef.current;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.05);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- OBJECT 1: THE BREATHING TERRAIN ---
    const geometry = new THREE.PlaneGeometry(40, 40, 50, 50);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0xffffff, 
        wireframe: true,
        transparent: true,
        opacity: 0.3 
    });
    const terrain = new THREE.Mesh(geometry, material);
    terrain.rotation.x = -Math.PI / 2;
    terrain.position.y = -3;
    scene.add(terrain);

    // --- OBJECT 2: FLOATING SHAPES ---
    const shapeGeometry = new THREE.IcosahedronGeometry(1, 0);
    const shapeMaterial = new THREE.MeshBasicMaterial({ color: 0xe63946, wireframe: true });
    
    const shape1 = new THREE.Mesh(shapeGeometry, shapeMaterial);
    shape1.position.set(-5, 2, -5);
    scene.add(shape1);

    const shape2 = new THREE.Mesh(shapeGeometry, new THREE.MeshBasicMaterial({ color: 0x457b9d, wireframe: true }));
    shape2.position.set(5, -1, -5);
    scene.add(shape2);

    // --- OBJECT 3: BACKGROUND STARS ---
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 2000;
    const posArray = new Float32Array(starsCount * 3);
    
    for(let i = 0; i < starsCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const starsMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xffffff,
        transparent: true,
        opacity: 0.8
    });
    const starsMesh = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starsMesh);

    // --- CAMERA POSITION ---
    camera.position.z = 5;

    // --- MOUSE INTERACTION ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    };
    document.addEventListener('mousemove', onMouseMove);

    // --- ANIMATION LOOP ---
    const clock = new THREE.Clock();
    let animationFrameId: number;

    function animate() {
        animationFrameId = requestAnimationFrame(animate);
        const time = clock.getElapsedTime();

        const positionAttribute = geometry.attributes.position as THREE.BufferAttribute;
        const vertex = new THREE.Vector3();
        
        for (let i = 0; i < positionAttribute.count; i++) {
            vertex.fromBufferAttribute(positionAttribute, i);
            const z = Math.sin(vertex.x * 0.5 + time * 0.5) * 0.5 + 
                      Math.cos(vertex.y * 0.5 + time * 0.3) * 0.5;
            positionAttribute.setZ(i, z);
        }
        positionAttribute.needsUpdate = true;

        shape1.rotation.x += 0.005;
        shape1.rotation.y += 0.01;
        shape1.position.y = 2 + Math.sin(time) * 0.5;

        shape2.rotation.x -= 0.01;
        shape2.rotation.y -= 0.005;
        shape2.position.y = -1 + Math.cos(time) * 0.5;

        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;

        camera.rotation.y += 0.05 * (targetX - camera.rotation.y);
        camera.rotation.x += 0.05 * (targetY - camera.rotation.x);

        starsMesh.rotation.y = time * 0.05;

        renderer.render(scene, camera);
    }
    animate();

    // --- RESIZE HANDLER ---
    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onMouseMove);
      container.removeChild(renderer.domElement);
      // Dispose of Three.js objects
      geometry.dispose();
      material.dispose();
      shapeGeometry.dispose();
      shapeMaterial.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();
      scene.remove(terrain, shape1, shape2, starsMesh);
    };
  }, []);

  return (
    <header className="h-screen w-full relative bg-black text-white font-tech selection:bg-primary selection:text-black">
      <div ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
      <div id="ui-layer" className="relative z-20 w-full h-full flex flex-col items-center justify-center text-center p-4">
        <div className="max-w-4xl">
            <p className="text-neutral-400 tracking-[0.2em] text-xs uppercase">Est. 2025 // Ampire Studio</p>
            <h1 className="font-headline text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold my-4 uppercase">
                Digital Dominance
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto">
                We architect high-performance digital experiences that convert passive visitors into obsessed customers.
            </p>
            <Link href="/contact" className="pointer-events-auto mt-8 inline-block">
                <Button
                    size="lg"
                    className="px-10 py-6 uppercase font-bold text-base bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_20px_hsl(var(--primary)_/_0.5)] transition-all duration-300"
                >
                    Get Started
                </Button>
            </Link>
        </div>
      </div>
    </header>
  );
}
