/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { useEffect, useRef } from 'react';
import { useColorScheme } from '@mui/material/styles';

export interface ParticleBackgroundProps {
  /**
   * Opacity of the canvas
   * @default 0.5
   */
  opacity?: number;
  /**
   * Particles per 10,000 px^2 (scales with screen size)
   * @default 0.12
   */
  baseDensity?: number;
  /**
   * Maximum speed in px per frame
   * @default 0.3
   */
  maxSpeed?: number;
  /**
   * Min and max radius of particles
   * @default [2.0, 3.2]
   */
  radius?: [number, number];
  /**
   * Maximum distance to draw line between particles
   * @default 210
   */
  linkDist?: number;
  /**
   * Base opacity of the lines
   * @default 0.2
   */
  linkAlpha?: number;
  /**
   * Radius of mouse influence
   * @default 110
   */
  mouseInfluence?: number;
  /**
   * How strong the repel effect is
   * @default 0.35
   */
  repelStrength?: number;
  /**
   * Impulse on click
   * @default 120
   */
  clickBurst?: number;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  opacity = 0.5,
  baseDensity = 0.12,
  maxSpeed = 0.3,
  radius = [2.0, 3.2],
  linkDist = 210,
  linkAlpha = 0.2,
  mouseInfluence = 110,
  repelStrength = 0.35,
  clickBurst = 120,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { mode } = useColorScheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Store references to avoid null checks
    const canvasEl = canvas;
    const context = ctx;

    // Color configuration based on theme
    const lightColors = {
      colorParticle: '#44444447',
      colorLink: '#000000',
    };
    const darkColors = {
      colorParticle: '#ffffff47',
      colorLink: '#ffffff',
    };

    let currentColors = mode === 'dark' ? darkColors : lightColors;

    // Setup
    let DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    let W = 0;
    let H = 0;
    let particles: Particle[] = [];
    let targetCount = 0;
    let animationFrameId: number;

    // Utility functions
    const rand = (min: number, max: number) => Math.random() * (max - min) + min;
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

    // Particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;

      constructor() {
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.r = 0;
        this.reset(true);
      }

      reset(randomPos = false) {
        this.x = randomPos ? rand(0, W) : Math.random() < 0.5 ? 0 : W;
        this.y = randomPos ? rand(0, H) : rand(0, H);
        const ang = rand(0, Math.PI * 2);
        const speed = rand(0.05, maxSpeed);
        this.vx = Math.cos(ang) * speed;
        this.vy = Math.sin(ang) * speed;
        this.r = rand(radius[0], radius[1]) * DPR;
      }

      step(mx: number | null, my: number | null) {
        // Mouse influence (repel)
        if (mx !== null && my !== null) {
          const dx = this.x - mx;
          const dy = this.y - my;
          const d2 = dx * dx + dy * dy;
          const r = mouseInfluence * DPR;
          if (d2 < r * r) {
            const d = Math.sqrt(d2) || 0.001;
            const ux = dx / d;
            const uy = dy / d;
            this.vx += ux * repelStrength * (1 - d / r);
            this.vy += uy * repelStrength * (1 - d / r);
          }
        }

        // Velocity clamp
        const sp = Math.hypot(this.vx, this.vy);
        const maxSp = maxSpeed;
        if (sp > maxSp) {
          this.vx *= maxSp / sp;
          this.vy *= maxSp / sp;
        }

        // Move
        this.x += this.vx * DPR;
        this.y += this.vy * DPR;

        // Wrap around edges
        if (this.x < -50) this.x = W + 50;
        if (this.x > W + 50) this.x = -50;
        if (this.y < -50) this.y = H + 50;
        if (this.y > H + 50) this.y = -50;
      }

      draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        context.fillStyle = currentColors.colorParticle;
        context.globalAlpha = 0.9;
        context.fill();
      }
    }

    // Resize handler
    function resize() {
      DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      W = canvasEl.width = Math.floor(window.innerWidth * DPR);
      H = canvasEl.height = Math.floor(window.innerHeight * DPR);
      canvasEl.style.width = window.innerWidth + 'px';
      canvasEl.style.height = window.innerHeight + 'px';
      computeParticlesCount();
    }

    function computeParticlesCount() {
      const area = (W * H) / (DPR * DPR);
      targetCount = Math.round(baseDensity * (area / 10000));
      targetCount = clamp(targetCount, 40, 220);
      if (particles.length < targetCount) {
        const add = targetCount - particles.length;
        for (let i = 0; i < add; i++) particles.push(new Particle());
      } else if (particles.length > targetCount) {
        particles.length = targetCount;
      }
    }

    // Mouse tracking
    const mouse = { x: null as number | null, y: null as number | null };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX * DPR;
      mouse.y = e.clientY * DPR;
    };

    const handleMouseLeave = () => {
      mouse.x = mouse.y = null;
    };

    const handleClick = (e: MouseEvent) => {
      const mx = e.clientX * DPR;
      const my = e.clientY * DPR;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - mx;
        const dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        const r = mouseInfluence * DPR;
        if (d2 < r * r) {
          const d = Math.sqrt(d2) || 0.001;
          const ux = dx / d;
          const uy = dy / d;
          p.vx += ux * (clickBurst / 100);
          p.vy += uy * (clickBurst / 100);
        }
      }
    };

    // Draw links between neighbors
    function drawLinks() {
      context.lineWidth = 1 * DPR;
      context.strokeStyle = currentColors.colorLink;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist * DPR) {
            const alpha = linkAlpha * (1 - dist / (linkDist * DPR));
            context.globalAlpha = alpha;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      }
      context.globalAlpha = 1;
    }

    // Animation loop
    function loop() {
      context.clearRect(0, 0, W, H);

      // Step + draw
      for (let i = 0; i < particles.length; i++) {
        particles[i].step(mouse.x, mouse.y);
      }

      drawLinks();

      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
      }

      animationFrameId = requestAnimationFrame(loop);
    }

    // Initialize
    resize();
    for (let i = 0; i < 120; i++) particles.push(new Particle());
    computeParticlesCount();

    // Event listeners
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    // Start animation
    loop();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [baseDensity, maxSpeed, radius, linkDist, linkAlpha, mouseInfluence, repelStrength, clickBurst]);

  // Update colors when theme changes
  useEffect(() => {
    // The color update happens naturally on next render since we're using mode in the effect
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      id="particle-bg"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
        opacity: opacity,
      }}
    />
  );
};

export default ParticleBackground;
