"use client";

import { useRef, useEffect, useCallback } from "react";

interface ScatterTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  scatterRadius?: number;
  scatterForce?: number;
  accentColor?: string;
}

export default function ScatterText({
  text,
  className = "",
  style = {},
  as: Tag = "span",
  scatterRadius = 60,
  scatterForce = 25,
  accentColor = "#00ff88",
}: ScatterTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const positionsRef = useRef<{ x: number; y: number; vx: number; vy: number }[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, isOver: false });
  const animRef = useRef<number>(0);

  const setCharRef = useCallback((el: HTMLSpanElement | null, idx: number) => {
    if (el) charsRef.current[idx] = el;
  }, []);

  useEffect(() => {
    // Initialize positions
    positionsRef.current = text.split("").map(() => ({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
    }));

    const animate = () => {
      const mouse = mouseRef.current;
      const container = containerRef.current;
      if (!container) {
        animRef.current = requestAnimationFrame(animate);
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const returnSpeed = 0.12;
      const friction = 0.78;

      for (let i = 0; i < charsRef.current.length; i++) {
        const charEl = charsRef.current[i];
        const pos = positionsRef.current[i];
        if (!charEl || !pos) continue;

        const charRect = charEl.getBoundingClientRect();
        const charCenterX = charRect.left + charRect.width / 2 - containerRect.left;
        const charCenterY = charRect.top + charRect.height / 2 - containerRect.top;

        if (mouse.isOver) {
          const dx = charCenterX + pos.x - mouse.x;
          const dy = charCenterY + pos.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < scatterRadius && dist > 0) {
            const force = (scatterRadius - dist) / scatterRadius;
            const angle = Math.atan2(dy, dx);
            pos.vx += Math.cos(angle) * force * scatterForce;
            pos.vy += Math.sin(angle) * force * scatterForce;
          }
        }

        // Spring back to origin
        pos.vx -= pos.x * returnSpeed;
        pos.vy -= pos.y * returnSpeed;

        // Friction
        pos.vx *= friction;
        pos.vy *= friction;

        // Update position
        pos.x += pos.vx;
        pos.y += pos.vy;

        // Apply transform
        const dist = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
        if (dist > 0.1) {
          charEl.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
          // Color shift when scattered
          const t = Math.min(1, dist / 30);
          charEl.style.color = "";
          charEl.style.textShadow = t > 0.1 ? `0 0 ${4 + t * 8}px ${accentColor}` : "none";
        } else {
          charEl.style.transform = "translate(0px, 0px)";
          charEl.style.textShadow = "none";
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, [text, scatterRadius, scatterForce, accentColor]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  };

  // Split text preserving words
  const chars = text.split("");

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLDivElement & HTMLHeadingElement & HTMLParagraphElement>}
      className={`${className} inline-block`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { mouseRef.current.isOver = true; }}
      onMouseLeave={() => { mouseRef.current.isOver = false; }}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          ref={(el) => setCharRef(el, i)}
          className="inline-block transition-colors duration-200 will-change-transform"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Tag>
  );
}
