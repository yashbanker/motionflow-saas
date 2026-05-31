"use client";

import { useEffect, useRef, useState } from "react";

const CUBE_COUNT = 15;
const LINE_COUNT = 10;

interface CubeData {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  active: boolean;
  size: number;
  isGlass: boolean;
}

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const clickRingRef = useRef<HTMLDivElement>(null);
  const cubeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const [isVisible, setIsVisible] = useState(false);

  // Use refs for animation loop state to avoid re-running useEffect
  const hoverType = useRef<"button" | "card" | "dashboard" | "">("");
  const isClicked = useRef(false);

  const mouse = useRef({ x: -100, y: -100 });
  const delayedMouse = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  // Initialize cubes
  const cubes = useRef<CubeData[]>(Array.from({ length: CUBE_COUNT }).map(() => ({
    x: 0, y: 0, vx: 0, vy: 0, life: 0, maxLife: 100, active: false, size: Math.random() * 8 + 4, isGlass: Math.random() > 0.5
  })));

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    let isRunning = true;

    const render = () => {
      if (!isRunning) return;

      const isFreeSpace = hoverType.current === "";

      // Core dot moves instantly
      if (dotRef.current) {
        const dotScale = isClicked.current ? 0.8 : hoverType.current ? 1.5 : 1;
        dotRef.current.style.transform = `translate3d(${mouse.current.x - 4}px, ${mouse.current.y - 4}px, 0) scale(${dotScale})`;
      }

      // Ring moves with lerp for smooth trailing
      delayedMouse.current.x += (mouse.current.x - delayedMouse.current.x) * 0.15;
      delayedMouse.current.y += (mouse.current.y - delayedMouse.current.y) * 0.15;

      if (ringRef.current) {
        let scale = 1;
        let borderColor = "rgba(124, 58, 237, 0.5)";
        let bg = "transparent";

        if (hoverType.current === "button") {
          scale = 2.5;
          bg = "rgba(124, 58, 237, 0.1)";
          borderColor = "rgba(124, 58, 237, 0.8)";
        } else if (hoverType.current === "card") {
          scale = 1.8;
          bg = "rgba(124, 58, 237, 0.05)";
          borderColor = "rgba(124, 58, 237, 0.6)";
        } else if (hoverType.current === "dashboard") {
          scale = 3;
          bg = "rgba(255, 255, 255, 0.05)";
          borderColor = "rgba(255, 255, 255, 0.2)";
        } else {
          // Free space AI Energy Field
          scale = 1.2;
          bg = "rgba(255, 255, 255, 0.02)";
        }

        ringRef.current.style.transform = `translate3d(${delayedMouse.current.x - 16}px, ${delayedMouse.current.y - 16}px, 0) scale(${scale})`;
        ringRef.current.style.backgroundColor = bg;
        ringRef.current.style.borderColor = borderColor;
        
        if (hoverType.current === 'dashboard' || hoverType.current === '') {
          ringRef.current.classList.add('cursor-glass');
        } else {
          ringRef.current.classList.remove('cursor-glass');
        }
      }

      // Update AI Cubic Field
      let activeLineIdx = 0;
      cubes.current.forEach((cube, i) => {
        if (!cube.active && isFreeSpace && Math.random() < 0.05) {
          // Spawn new cube around the cursor
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * 60 + 20;
          cube.x = delayedMouse.current.x + Math.cos(angle) * dist;
          cube.y = delayedMouse.current.y + Math.sin(angle) * dist;
          cube.vx = (Math.random() - 0.5) * 0.5;
          cube.vy = (Math.random() - 0.5) * 0.5 - 0.2; // slight upward drift
          cube.life = 0;
          cube.maxLife = Math.random() * 80 + 80;
          cube.active = true;
          cube.size = Math.random() * 8 + 4;
          cube.isGlass = Math.random() > 0.5;
        }

        if (cube.active) {
          cube.life++;
          cube.x += cube.vx;
          cube.y += cube.vy;
          
          // AI Interaction: Pull towards cursor gently
          const dx = mouse.current.x - cube.x;
          const dy = mouse.current.y - cube.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          
          let scale = 1;
          let glowOpacity = 0;

          if (dist < 120) {
            cube.vx += (dx / dist) * 0.015;
            cube.vy += (dy / dist) * 0.015;
            scale = 1 + (120 - dist) / 120 * 0.5;
            glowOpacity = (120 - dist) / 120;
          }
          
          // Air friction
          cube.vx *= 0.98;
          cube.vy *= 0.98;
          
          let opacity = Math.sin((cube.life / cube.maxLife) * Math.PI);
          
          // Fade out quickly if we hover an element
          if (!isFreeSpace) {
            opacity -= 0.1;
            if (opacity <= 0) cube.active = false;
          } else if (cube.life >= cube.maxLife) {
            cube.active = false;
          }
          
          const el = cubeRefs.current[i];
          if (el) {
            if (cube.active && opacity > 0) {
              el.style.opacity = opacity.toFixed(2);
              el.style.transform = `translate3d(${cube.x - cube.size/2}px, ${cube.y - cube.size/2}px, 0) scale(${scale}) rotate(${cube.life * 0.5}deg)`;
              if (cube.isGlass) {
                el.style.boxShadow = `0 0 ${10 * scale}px rgba(124, 58, 237, ${glowOpacity * 0.5})`;
              }
            } else {
              el.style.opacity = '0';
            }
          }

          // Draw lines between active cubes
          for (let j = i + 1; j < CUBE_COUNT; j++) {
            const other = cubes.current[j];
            if (!other.active || activeLineIdx >= LINE_COUNT) continue;

            const ldx = other.x - cube.x;
            const ldy = other.y - cube.y;
            const lDist = Math.sqrt(ldx*ldx + ldy*ldy);

            if (lDist < 80) {
              const lineOp = (1 - lDist / 80) * 0.4 * Math.min(opacity, Math.sin((other.life / other.maxLife) * Math.PI));
              const lineEl = lineRefs.current[activeLineIdx];
              if (lineEl) {
                const angle = Math.atan2(ldy, ldx);
                lineEl.style.opacity = lineOp.toFixed(2);
                lineEl.style.width = `${lDist}px`;
                lineEl.style.transform = `translate3d(${cube.x}px, ${cube.y}px, 0) rotate(${angle}rad)`;
              }
              activeLineIdx++;
            }
          }
        }
      });

      // Hide unused lines
      for (let i = activeLineIdx; i < LINE_COUNT; i++) {
        const el = lineRefs.current[i];
        if (el) el.style.opacity = '0';
      }

      rafId.current = requestAnimationFrame(render);
    };

    const moveCursor = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[data-cursor-magnetic]")
      ) {
        hoverType.current = "button";
      } else if (target.closest(".hover-card") || target.closest("[data-cursor-card]")) {
        hoverType.current = "card";
      } else if (target.closest(".dashboard-mockup") || target.closest("[data-cursor-dashboard]")) {
        hoverType.current = "dashboard";
      } else {
        hoverType.current = "";
      }
    };

    const handleMouseDown = () => {
      isClicked.current = true;
      if (clickRingRef.current) {
        clickRingRef.current.style.transform = `translate3d(${mouse.current.x - 16}px, ${mouse.current.y - 16}px, 0) scale(0)`;
        clickRingRef.current.style.opacity = '0.8';
        clickRingRef.current.style.transition = 'none';
        
        // Force reflow
        void clickRingRef.current.offsetWidth;
        
        clickRingRef.current.style.transition = 'transform 250ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 250ms ease-out';
        clickRingRef.current.style.transform = `translate3d(${mouse.current.x - 16}px, ${mouse.current.y - 16}px, 0) scale(3)`;
        clickRingRef.current.style.opacity = '0';
      }
    };

    const handleMouseUp = () => {
       isClicked.current = false;
    };
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    rafId.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        * { cursor: none !important; }
        
        button, a, [data-cursor-magnetic] {
          transition: transform 300ms cubic-bezier(0.25, 1, 0.5, 1), box-shadow 300ms ease;
        }
        button:hover, a:hover, [data-cursor-magnetic]:hover {
          transform: scale(1.02);
          box-shadow: 0 5px 20px rgba(124, 58, 237, 0.15);
        }

        .hover-card {
          transition: transform 300ms cubic-bezier(0.25, 1, 0.5, 1), border-color 300ms ease;
        }
        .hover-card:hover {
          transform: perspective(500px) rotateX(3deg) rotateY(-3deg) scale(1.02);
          border-color: rgba(124, 58, 237, 0.4);
        }
        
        .cursor-ring-base {
          transition: background-color 200ms ease, border-color 200ms ease;
          will-change: transform;
        }
        
        .cursor-glass {
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }
      ` }} />
      
      {/* AI Connection Lines */}
      {Array.from({ length: LINE_COUNT }).map((_, i) => (
        <div
          key={`line-${i}`}
          ref={(el) => { lineRefs.current[i] = el; }}
          className="fixed top-0 left-0 h-[1px] bg-primary/40 pointer-events-none z-[9996] origin-left opacity-0"
          style={{ willChange: "transform, opacity, width" }}
        />
      ))}

      {/* AI Cubic Field */}
      {Array.from({ length: CUBE_COUNT }).map((_, i) => {
        const isGlass = cubes.current[i].isGlass;
        return (
          <div
            key={`cube-${i}`}
            ref={(el) => { cubeRefs.current[i] = el; }}
            className={`fixed top-0 left-0 pointer-events-none z-[9997] opacity-0 ${isGlass ? 'border border-primary/40 cursor-glass' : 'border border-primary/20'}`}
            style={{ 
              width: cubes.current[i].size,
              height: cubes.current[i].size,
              willChange: "transform, opacity"
            }}
          />
        );
      })}
      
      {/* Click explosion ring */}
      <div 
        ref={clickRingRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full bg-primary/20 pointer-events-none z-[9999] opacity-0"
        style={{ willChange: 'transform, opacity' }}
      />

      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/50 pointer-events-none z-[9998] flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.3)] cursor-ring-base cursor-glass"
        style={{ transformOrigin: "center center", willChange: "transform" }}
      />

      {/* Core Dot */}
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[10000] shadow-[0_0_10px_rgba(124,58,237,1)]"
        style={{ 
          background: 'radial-gradient(circle at center, #9d7cff 0%, #7c3aed 100%)',
          transformOrigin: "center center", 
          transition: "transform 150ms ease-out",
          willChange: "transform"
        }}
      />
    </>
  );
};
