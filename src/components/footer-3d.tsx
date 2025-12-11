
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { getContactDetails } from '@/lib/data';
import { socialLinks } from '@/lib/social-links';
import Link from 'next/link';

export function Footer3d() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const contactDetails = getContactDetails();
  
  const footerLinks = [
      { name: 'About', href: '/about'},
      { name: 'Services', href: '/services'},
      { name: 'Work', href: '/portfolio'},
      { name: 'Blog', href: '/blog'},
      { name: 'Privacy Policy', href: '#'}
  ]

  useEffect(() => {
    if (typeof window === 'undefined' || !canvasRef.current) return;

    const container = canvasRef.current;
    if (!container) return;

    // Prevent multiple renderers
    if (container.querySelector('canvas')) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.05);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(40, 40, 50, 50);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0xffffff, 
        wireframe: true,
        transparent: true,
        opacity: 0.15 
    });
    const terrain = new THREE.Mesh(geometry, material);
    terrain.rotation.x = -Math.PI / 2;
    terrain.position.y = -3;
    scene.add(terrain);

    const shapeGeometry = new THREE.IcosahedronGeometry(1, 0);
    const shapeMaterial = new THREE.MeshBasicMaterial({ color: 0xe63946, wireframe: true });
    
    const shape1 = new THREE.Mesh(shapeGeometry, shapeMaterial);
    shape1.position.set(-5, 2, -5);
    scene.add(shape1);

    const shape2 = new THREE.Mesh(shapeGeometry, new THREE.MeshBasicMaterial({ color: 0x457b9d, wireframe: true }));
    shape2.position.set(5, -1, -5);
    scene.add(shape2);

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

    camera.position.z = 5;

    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    };
    document.addEventListener('mousemove', onMouseMove);

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

    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onMouseMove);
      container.removeChild(renderer.domElement);
    };

  }, []);

  return (
    <>
      <div id="canvas-container" ref={canvasRef}></div>

      <footer className="footer-main">
          <div className="footer-cta">
              <div className="cta-label">01 // INITIATE PROTOCOL</div>
              <h2 className="cta-heading">Have a Cool Idea?<br/>Let's Collaborate.</h2>
              <a href={`mailto:${contactDetails.email}`} className="cta-button-large">
                  Get In Touch +
              </a>
          </div>

          <div className="footer-grid">
              <div className="grid-item">
                  <div className="grid-label">Location (HQ)</div>
                  <div className="grid-content">
                      {contactDetails.address.line1}<br/>{contactDetails.address.line2}<br/><br/>
                      <span style={{ fontSize: '0.8em', color: '#aaa' }}>LAT: 3.1412 N <br/> LON: 101.6869 E</span>
                  </div>
              </div>
              <div className="grid-item">
                  <div className="grid-label">Social Uplink</div>
                  <div className="grid-content">
                      {socialLinks.map(link => (
                          <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer">• {link.name}</a>
                      ))}
                  </div>
              </div>
              <div className="grid-item">
                  <div className="grid-label">Communication</div>
                  <div className="grid-content">
                      <a href={`tel:${contactDetails.phone}`}>{contactDetails.phone}</a>
                      <a href={`mailto:${contactDetails.email}`} style={{ fontSize: '0.9em', wordBreak: 'break-all' }}>{contactDetails.email}</a>
                  </div>
              </div>
              <div className="grid-item">
                  <div className="grid-label">Directory</div>
                  <div className="grid-content">
                      {footerLinks.map(link => (
                        <Link key={link.href} href={link.href}>• {link.name}</Link>
                      ))}
                  </div>
              </div>
          </div>
      </footer>
      <style jsx>{`
        #canvas-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            z-index: -1;
            pointer-events: none;
        }
        .footer-main {
            position: relative;
            z-index: 2;
            background-color: #001f3f; /* Dark Blue */
            color: white;
            display: flex;
            flex-direction: column;
        }
        .footer-cta {
            padding: 4rem 5vw;
            border-bottom: 1px solid #003366;
            display: flex;
            flex-direction: column;
            gap: 20px;
            background-color: #001a33;
        }
        .cta-label { font-size: 1rem; color: #87ceeb; margin-bottom: 1rem; }
        .cta-heading {
            font-size: 4rem;
            line-height: 1.1;
            margin: 0;
            max-width: 800px;
            font-family: var(--font-headline);
        }
        .cta-button-large {
            display: inline-flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 2rem;
            padding: 1.5rem 3rem;
            border: 1px solid white;
            color: white;
            text-decoration: none;
            font-size: 1.5rem;
            width: fit-content;
            transition: 0.3s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .cta-button-large:hover {
            background: hsl(var(--secondary));
            border-color: hsl(var(--secondary));
            padding-left: 4rem;
        }
        .footer-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            border-bottom: 1px solid #003366;
        }
        .grid-item {
            padding: 2rem;
            border-right: 1px solid #003366;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 200px;
            transition: background 0.3s;
        }
        .grid-item:last-child { border-right: none; }
        .grid-item:hover { background: #001a33; }
        .grid-label { font-size: 0.8rem; color: #87ceeb; margin-bottom: 1rem; text-transform: uppercase; }
        .grid-content { font-size: 1.1rem; line-height: 1.6; font-family: var(--font-body); }
        .grid-content a { color: white; text-decoration: none; display: block; margin-bottom: 0.5rem; transition: color 0.2s; }
        .grid-content a:hover { color: hsl(var(--secondary)); text-decoration: underline; }
        @media (max-width: 1024px) {
            .footer-grid { grid-template-columns: 1fr 1fr; }
            .grid-item:nth-child(2) { border-right: none; }
            .grid-item:nth-child(3), .grid-item:nth-child(4) { border-top: 1px solid #003366; }
        }
        @media (max-width: 768px) {
            .footer-grid { grid-template-columns: 1fr; }
            .grid-item { border-right: none; border-bottom: 1px solid #003366; }
            .cta-heading { font-size: 2.5rem; }
        }
      `}</style>
    </>
  );
}
