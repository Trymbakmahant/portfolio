"use client";

import { useEffect, useRef, useCallback, useState } from "react";

interface BorderParticle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  char: string;
  opacity: number;
}

interface ScatterBoxProps {
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
  particleDensity?: number;
  borderChars?: string;
  scatterRadius?: number;
  scatterForce?: number;
}

export default function ScatterBox({
  children,
  className = "",
  accentColor = "#00ff88",
  particleDensity = 4,
  borderChars = ".:+=-~*",
  scatterRadius = 60,
  scatterForce = 6,
}: ScatterBoxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<BorderParticle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, isOver: false });
  const animFrameRef = useRef<number>(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Generate border particles
  const generateParticles = useCallback(
    (w: number, h: number) => {
      const particles: BorderParticle[] = [];
      const spacing = particleDensity;

      // Top border
      for (let x = 0; x < w; x += spacing) {
        particles.push(createParticle(x, 0, borderChars));
      }
      // Bottom border
      for (let x = 0; x < w; x += spacing) {
        particles.push(createParticle(x, h - 1, borderChars));
      }
      // Left border
      for (let y = spacing; y < h - spacing; y += spacing) {
        particles.push(createParticle(0, y, borderChars));
      }
      // Right border
      for (let y = spacing; y < h - spacing; y += spacing) {
        particles.push(createParticle(w - 1, y, borderChars));
      }

      return particles;
    },
    [particleDensity, borderChars]
  );

  // Observe size changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
        particlesRef.current = generateParticles(width, height);
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [generateParticles]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      ctx.font = "5px monospace";
      ctx.textBaseline = "middle";

      const mouse = mouseRef.current;
      const particles = particlesRef.current;
      const returnSpeed = 0.1;
      const friction = 0.82;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (mouse.isOver) {
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

        // Spring back
        const dxOrigin = p.originX - p.x;
        const dyOrigin = p.originY - p.y;
        p.vx += dxOrigin * returnSpeed;
        p.vy += dyOrigin * returnSpeed;

        p.vx *= friction;
        p.vy *= friction;

        p.x += p.vx;
        p.y += p.vy;

        // Color based on displacement
        const distFromOrigin = Math.sqrt(
          (p.x - p.originX) ** 2 + (p.y - p.originY) ** 2
        );

        let alpha = p.opacity;
        const color = accentColor;

        if (distFromOrigin > 10) {
          alpha = Math.min(1, 0.5 + distFromOrigin / 40);
        } else {
          alpha = p.opacity;
        }

        // Parse hex color to rgba
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fillText(p.char, p.x, p.y);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [dimensions, accentColor, scatterRadius, scatterForce]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { mouseRef.current.isOver = true; }}
      onMouseLeave={() => { mouseRef.current.isOver = false; }}
    >
      {/* Particle border canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
        style={{ width: "100%", height: "100%" }}
      />
      {/* Content */}
      <div className="relative z-0">{children}</div>
    </div>
  );
}

function createParticle(x: number, y: number, chars: string): BorderParticle {
  return {
    x,
    y,
    originX: x,
    originY: y,
    vx: 0,
    vy: 0,
    char: chars[Math.floor(Math.random() * chars.length)],
    opacity: 0.3 + Math.random() * 0.4,
  };
}
