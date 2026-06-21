"use client";

import { useEffect, useRef, useCallback, useState } from "react";

// ASCII characters from dark to light
const ASCII_CHARS = "@%#W$9876543210?!abc;:+=-,._ ";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  char: string;
  vx: number;
  vy: number;
  brightness: number;
}

interface AsciiPortraitProps {
  imageSrc: string;
  width?: number;
  height?: number;
}

export default function AsciiPortrait({
  imageSrc,
  width = 500,
  height = 620,
}: AsciiPortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, isOver: false });
  const animFrameRef = useRef<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const initParticles = useCallback(
    (img: HTMLImageElement) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Draw image to get pixel data
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) return;

      tempCanvas.width = width;
      tempCanvas.height = height;
      tempCtx.drawImage(img, 0, 0, width, height);

      const imageData = tempCtx.getImageData(0, 0, width, height);
      const pixels = imageData.data;

      const particles: Particle[] = [];
      const cellSize = 6; // Smaller cells = more detail
      const cols = Math.floor(width / cellSize);
      const rows = Math.floor(height / cellSize);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const px = col * cellSize;
          const py = row * cellSize;

          // Sample pixel at center of cell
          const i = (py * width + px) * 4;
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const brightness = (r + g + b) / 3;

          // Skip very dark pixels (background)
          if (brightness < 12) continue;

          const charIndex = Math.floor(
            ((255 - brightness) / 255) * (ASCII_CHARS.length - 1)
          );
          const char = ASCII_CHARS[charIndex];

          // Skip whitespace characters
          if (char === " ") continue;

          particles.push({
            x: px,
            y: py,
            originX: px,
            originY: py,
            char,
            vx: 0,
            vy: 0,
            brightness: brightness / 255,
          });
        }
      }

      particlesRef.current = particles;
      setIsLoaded(true);
    },
    [width, height]
  );

  // Load image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => initParticles(img);
    img.src = imageSrc;
  }, [imageSrc, initParticles]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.font = "5.5px monospace";
      ctx.textBaseline = "top";

      const mouse = mouseRef.current;
      const particles = particlesRef.current;
      const scatterRadius = 100;
      const scatterForce = 12;
      const returnSpeed = 0.06;
      const friction = 0.88;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (mouse.isOver) {
          // Calculate distance from mouse
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < scatterRadius) {
            const force = (scatterRadius - dist) / scatterRadius;
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * force * scatterForce;
            p.vy += Math.sin(angle) * force * scatterForce;
          }
        }

        // Spring back to origin
        const dxOrigin = p.originX - p.x;
        const dyOrigin = p.originY - p.y;
        p.vx += dxOrigin * returnSpeed;
        p.vy += dyOrigin * returnSpeed;

        // Apply friction
        p.vx *= friction;
        p.vy *= friction;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Color based on distance from origin (scattered vs settled)
        const distFromOrigin = Math.sqrt(
          (p.x - p.originX) ** 2 + (p.y - p.originY) ** 2
        );

        let color: string;
        if (distFromOrigin > 20) {
          // Far scattered - bright neon green
          color = `rgba(0, 255, 136, ${0.6 + p.brightness * 0.4})`;
        } else if (distFromOrigin > 5) {
          // Slightly displaced - transitioning color
          const t = distFromOrigin / 20;
          const r = Math.floor(255 * (1 - t));
          const g = Math.floor(255 * (1 - t) + 255 * t);
          const b = Math.floor(255 * (1 - t) + 136 * t);
          color = `rgba(${r}, ${g}, ${b}, ${0.4 + p.brightness * 0.6})`;
        } else {
          // Settled - white/light gray
          color = `rgba(255, 255, 255, ${0.2 + p.brightness * 0.8})`;
        }

        ctx.fillStyle = color;
        ctx.fillText(p.char, p.x, p.y);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [width, height, isLoaded]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  };

  const handleMouseEnter = () => {
    mouseRef.current.isOver = true;
  };

  const handleMouseLeave = () => {
    mouseRef.current.isOver = false;
  };

  return (
    <div className="relative inline-block">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0, 255, 136, 0.04) 0%, transparent 70%)",
          filter: "blur(40px)",
          transform: "scale(1.2)",
        }}
      />

      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cursor-crosshair relative z-10"
        style={{ backgroundColor: "transparent" }}
      />

      {/* Loading state */}
      {!isLoaded && (
        <div
          className="absolute inset-0 flex items-center justify-center font-mono text-xs z-20"
          style={{ color: "#00ff88" }}
        >
          <span className="animate-pulse">initializing...</span>
        </div>
      )}
    </div>
  );
}
