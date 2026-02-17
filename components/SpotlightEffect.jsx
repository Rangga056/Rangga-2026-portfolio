"use client";

import { useEffect, useState, useCallback, useRef } from 'react';

export default function SpotlightEffect() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const rafIdRef = useRef(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setOpacity(1);

      // Cancel any pending animation frame
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }

      // Use requestAnimationFrame for smoother updates
      rafIdRef.current = requestAnimationFrame(() => {
        setPosition({ x: mouseX, y: mouseY });
      });
    };

    const handleMouseLeave = () => {
      setOpacity(0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        opacity: opacity * 0.5,
        background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(0, 240, 255, 0.08), transparent 40%)`
      }}
    />
  );
}
