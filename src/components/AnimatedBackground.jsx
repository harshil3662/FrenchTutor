import React, { useMemo, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

export const AnimatedBackground = ({ isPaused = false }) => {
  const containerRef = useRef(null);

  // Directly pause browser animation engine when modal is active for distraction-free study
  useEffect(() => {
    if (!containerRef.current) return;
    try {
      const anims = containerRef.current.getAnimations({ subtree: true });
      anims.forEach((anim) => {
        if (isPaused) {
          anim.pause();
        } else {
          anim.play();
        }
      });
    } catch {
      // Fallback if getAnimations is not supported in environment
    }
  }, [isPaused]);

  // French grammatical & typographical diacritics drifting serenely through the atelier
  const typographicGlyphs = useMemo(
    () => [
      { id: 1, text: 'é', xStart: 8, delay: 0, duration: 26, size: 'text-4xl', color: 'text-[#5A5A40]/16' },
      { id: 2, text: '« »', xStart: 24, delay: 3, duration: 32, size: 'text-3xl', color: 'text-[#3E3E2C]/14' },
      { id: 3, text: 'ê', xStart: 42, delay: 6, duration: 28, size: 'text-5xl', color: 'text-[#5A5A40]/15' },
      { id: 4, text: 'ç', xStart: 58, delay: 2, duration: 30, size: 'text-4xl', color: 'text-[#9C4B2E]/14' },
      { id: 5, text: 'œ', xStart: 72, delay: 5, duration: 34, size: 'text-4xl', color: 'text-[#5A5A40]/18' },
      { id: 6, text: 'à', xStart: 86, delay: 1, duration: 27, size: 'text-3xl', color: 'text-[#3E3E2C]/15' },
      { id: 7, text: 'è', xStart: 16, delay: 9, duration: 31, size: 'text-4xl', color: 'text-[#5A5A40]/14' },
      { id: 8, text: 'î', xStart: 34, delay: 11, duration: 29, size: 'text-3xl', color: 'text-[#9C4B2E]/12' },
      { id: 9, text: 'ô', xStart: 66, delay: 7, duration: 33, size: 'text-4xl', color: 'text-[#5A5A40]/16' },
      { id: 10, text: '—', xStart: 80, delay: 4, duration: 35, size: 'text-2xl', color: 'text-[#3E3E2C]/14' },
      { id: 11, text: 'ù', xStart: 50, delay: 8, duration: 28, size: 'text-3xl', color: 'text-[#5A5A40]/15' },
      { id: 12, text: 'ë', xStart: 92, delay: 12, duration: 30, size: 'text-4xl', color: 'text-[#5A5A40]/14' },
    ],
    []
  );

  // Soft ambient study motes (warm sunlight drifting in an atelier)
  const studyMotes = useMemo(
    () => [
      { id: 1, left: '14%', top: '22%', delay: 0, duration: 18, size: 'w-2 h-2' },
      { id: 2, left: '32%', top: '68%', delay: 3, duration: 22, size: 'w-2.5 h-2.5' },
      { id: 3, left: '52%', top: '16%', delay: 1.5, duration: 20, size: 'w-2 h-2' },
      { id: 4, left: '68%', top: '74%', delay: 4, duration: 24, size: 'w-1.5 h-1.5' },
      { id: 5, left: '84%', top: '32%', delay: 2, duration: 19, size: 'w-2 h-2' },
      { id: 6, left: '90%', top: '82%', delay: 5, duration: 21, size: 'w-2.5 h-2.5' },
    ],
    []
  );

  // Elegant atelier drafting rings (subtle linguistic / geometrical coordinate circles)
  const draftingRings = useMemo(
    () => [
      { id: 1, left: '8%', top: '18%', size: 'w-64 h-64', duration: 48, clockwise: true },
      { id: 2, left: '76%', top: '55%', size: 'w-80 h-80', duration: 54, clockwise: false },
      { id: 3, left: '42%', top: '78%', size: 'w-56 h-56', duration: 42, clockwise: true },
    ],
    []
  );

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      id="atelier-animated-background"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden transform-gpu will-change-transform select-none"
      style={{ isolation: 'isolate', contain: 'strict', transform: 'translateZ(0)' }}
    >
      {/* 1. Atelier Ambient Light Pools — perfectly harmonized with #F5F5F0 base palette */}
      {/* Warm Ivory & Parchment Light Pool (Top Left) */}
      <motion.div
        animate={
          isPaused
            ? { x: 0, y: 0, scale: 1 }
            : {
                x: [0, 35, -25, 20, 0],
                y: [0, -30, 20, -15, 0],
                scale: [1, 1.08, 0.96, 1.04, 1],
              }
        }
        transition={
          isPaused
            ? { duration: 0.3 }
            : {
                duration: 28,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
        className="absolute -top-[12%] -left-[10%] w-[58vw] h-[58vw] rounded-full bg-gradient-to-br from-[#FFFDF8]/70 via-[#FAF5EC]/45 to-transparent blur-3xl"
      />

      {/* French Olive & Atelier Sage Pool (Top Right) */}
      <motion.div
        animate={
          isPaused
            ? { x: 0, y: 0, scale: 1 }
            : {
                x: [0, -40, 30, -20, 0],
                y: [0, 35, -30, 25, 0],
                scale: [1, 0.94, 1.08, 0.98, 1],
              }
        }
        transition={
          isPaused
            ? { duration: 0.3 }
            : {
                duration: 32,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
        className="absolute top-[3%] -right-[10%] w-[52vw] h-[52vw] rounded-full bg-gradient-to-bl from-[#E6EDE0]/55 via-[#EEF2E8]/35 to-transparent blur-3xl"
      />

      {/* Terracotta & Warm Parchment Subtle Glow (Bottom Center-Left) */}
      <motion.div
        animate={
          isPaused
            ? { x: 0, y: 0, scale: 1 }
            : {
                x: [0, 30, -20, 30, 0],
                y: [0, 25, 45, -20, 0],
                scale: [0.96, 1.06, 0.98, 1.08, 0.96],
              }
        }
        transition={
          isPaused
            ? { duration: 0.3 }
            : {
                duration: 30,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
        className="absolute -bottom-[16%] left-[8%] w-[56vw] h-[56vw] rounded-full bg-gradient-to-tr from-[#F8EDE6]/50 via-[#F4E9E2]/30 to-transparent blur-3xl"
      />

      {/* Alabaster & Warm Linen Depth (Bottom Right) */}
      <motion.div
        animate={
          isPaused
            ? { x: 0, y: 0, scale: 1 }
            : {
                x: [0, -25, 15, -10, 0],
                y: [0, -25, 30, -15, 0],
                scale: [1, 1.05, 0.95, 1.03, 1],
              }
        }
        transition={
          isPaused
            ? { duration: 0.3 }
            : {
                duration: 29,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
        className="absolute -bottom-[12%] -right-[8%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tl from-[#EDECE4]/55 via-[#F6F5EC]/35 to-transparent blur-3xl"
      />

      {/* 2. Atelier Drafting Paper Grid Overlay (Papier Vélin / Carnet d'Étude) */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            radial-gradient(#5A5A40 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
        }}
      />

      {/* 3. Subtle Rotating Drafting Rings (Linguistic Syntactic Compasses) */}
      <div className="absolute inset-0 overflow-hidden">
        {draftingRings.map((ring) => (
          <motion.div
            key={`drafting-ring-${ring.id}`}
            animate={
              isPaused
                ? { rotate: 0 }
                : {
                    rotate: ring.clockwise ? [0, 360] : [0, -360],
                  }
            }
            transition={
              isPaused
                ? { duration: 0.3 }
                : {
                    duration: ring.duration,
                    repeat: Infinity,
                    ease: 'linear',
                  }
            }
            className={`absolute rounded-full border border-dashed border-[#5A5A40]/[0.07] ${ring.size}`}
            style={{ left: ring.left, top: ring.top }}
          >
            {/* Inner concentric fine ring */}
            <div className="absolute inset-4 rounded-full border border-[#5A5A40]/[0.04]" />
          </motion.div>
        ))}
      </div>

      {/* 4. French Grammatical & Typographical Diacritics Drifting Gently */}
      <div
        className={`absolute inset-0 overflow-hidden transition-opacity duration-300 ${
          isPaused ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {!isPaused &&
          typographicGlyphs.map((glyph) => {
            return (
              <motion.div
                key={`glyph-${glyph.id}`}
                initial={{
                  y: '-10vh',
                  x: `${glyph.xStart}vw`,
                  opacity: 0,
                  rotate: 0,
                }}
                animate={{
                  y: ['-5vh', '110vh'],
                  x: [
                    `${glyph.xStart}vw`,
                    `${glyph.xStart + (glyph.id % 2 === 0 ? 3 : -3)}vw`,
                    `${glyph.xStart + (glyph.id % 2 === 0 ? -2 : 2.5)}vw`,
                    `${glyph.xStart + (glyph.id % 2 === 0 ? 4 : -4)}vw`,
                  ],
                  opacity: [0, 0.9, 0.9, 0],
                  rotate: [0, glyph.id % 2 === 0 ? 15 : -15, 0],
                }}
                transition={{
                  duration: glyph.duration,
                  repeat: Infinity,
                  delay: glyph.delay,
                  ease: 'linear',
                }}
                className={`absolute font-serif font-normal select-none pointer-events-none ${glyph.size} ${glyph.color}`}
              >
                {glyph.text}
              </motion.div>
            );
          })}
      </div>

      {/* 5. Golden Atelier Study Motes (Lumière de Bibliothèque) */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isPaused ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {!isPaused &&
          studyMotes.map((mote) => (
            <motion.div
              key={`study-mote-${mote.id}`}
              animate={{
                y: [0, -30, 0],
                x: [0, 10, -8, 0],
                opacity: [0.15, 0.55, 0.15],
                scale: [0.85, 1.25, 0.85],
              }}
              transition={{
                duration: mote.duration,
                delay: mote.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className={`absolute rounded-full bg-gradient-to-br from-[#D98E73]/40 to-[#5A5A40]/30 blur-[0.5px] ${mote.size}`}
              style={{ left: mote.left, top: mote.top }}
            />
          ))}
      </div>
    </div>
  );
};

