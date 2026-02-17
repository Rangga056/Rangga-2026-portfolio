"use client";

import { useEffect, useRef } from 'react';

export default function AnimatedGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const dots = [];
    const spacing = 60;
    const maxDistance = 120;

    for (let x = 0; x < canvas.width; x += spacing) {
      for (let y = 0; y < canvas.height && y < 800; y += spacing) {
        dots.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3
        });
      }
    }

    let mouseX = -1000;
    let mouseY = -1000;
    let lastMouseUpdate = 0;

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastMouseUpdate > 16) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        lastMouseUpdate = now;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        
        dot.x += dot.vx;
        dot.y += dot.vy;

        const dx = dot.baseX - dot.x;
        const dy = dot.baseY - dot.y;
        dot.x += dx * 0.03;
        dot.y += dy * 0.03;

        const distX = mouseX - dot.x;
        const distY = mouseY - dot.y;
        const distance = Math.sqrt(distX * distX + distY * distY);

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          dot.x -= distX * force * 0.02;
          dot.y -= distY * force * 0.02;
        }

        const opacity = distance < maxDistance ? 0.5 : 0.12;
        ctx.fillStyle = `rgba(0, 240, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < Math.min(i + 10, dots.length); j++) {
          const otherDot = dots[j];
          const dx = otherDot.x - dot.x;
          const dy = otherDot.y - dot.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < spacing * 1.8 && dist > 0) {
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.08 * (1 - dist / (spacing * 1.8))})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(otherDot.x, otherDot.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
      style={{ zIndex: 0 }}
    />
  );
}
