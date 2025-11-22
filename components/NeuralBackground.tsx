import React, { useRef, useEffect } from 'react';
import { AppPhase } from '../types';

interface NeuralBackgroundProps {
  phase: AppPhase;
}

const NeuralBackground: React.FC<NeuralBackgroundProps> = ({ phase }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  
  // Configuration
  const particleCount = 120;
  const connectionDistance = 120;
  const mouseRadius = 200;
  const particleColor = 'rgba(100, 116, 139, 0.4)'; // Slate-400ish
  const lineColor = 'rgba(59, 130, 246, 0.15)'; // Logic Blue hint

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.x;
      mouseRef.current.y = e.y;
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 2 + 0.5;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const vx = (Math.random() - 0.5) * 0.4; // Slow drift
        const vy = (Math.random() - 0.5) * 0.4;
        particles.push({ x, y, vx, vy, size, baseX: x, baseY: y });
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Only process full physics if past initialization
      const isInteractive = phase === AppPhase.INTERACTIVE;

      particles.forEach((p) => {
        // Movement
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Mouse Interaction (The "Gravity Field")
        if (isInteractive && mouseRef.current.x !== null && mouseRef.current.y !== null) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseRadius) {
             // Pull towards mouse
             const forceDirectionX = dx / distance;
             const forceDirectionY = dy / distance;
             const force = (mouseRadius - distance) / mouseRadius;
             const directionX = forceDirectionX * force * 1.5; 
             const directionY = forceDirectionY * force * 1.5;
             
             p.x += directionX;
             p.y += directionY;
          }
        }

        // Draw Particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
      });

      // Connect Particles (The "Neural Net")
      // Optimization: Nested loop, but limited count
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance;
            ctx.strokeStyle = lineColor.replace('0.15', (opacity * 0.15).toString());
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [phase]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full pointer-events-none transition-opacity duration-[2000ms] ${
        phase === AppPhase.INITIALIZING ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ zIndex: 0 }}
    />
  );
};

export default NeuralBackground;