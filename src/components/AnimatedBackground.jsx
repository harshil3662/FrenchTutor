import React, { memo } from 'react';

// Ambient motion lives in CSS keyframes (index.css) on transform and opacity only. The browser runs
// them on the compositor, so scrolling does not trigger per-frame JavaScript or repaints of this layer.

// French grammatical & typographical diacritics drifting serenely through the atelier
const TYPOGRAPHIC_GLYPHS = [
  { id: 1, text: 'é', xStart: 8, delay: 0, duration: 26, size: 'text-4xl', color: 'text-[#1F3A5F]/16' },
  { id: 2, text: '« »', xStart: 24, delay: 3, duration: 32, size: 'text-3xl', color: 'text-[#152A47]/14' },
  { id: 3, text: 'ê', xStart: 42, delay: 6, duration: 28, size: 'text-5xl', color: 'text-[#1F3A5F]/15' },
  { id: 4, text: 'ç', xStart: 58, delay: 2, duration: 30, size: 'text-4xl', color: 'text-[#8A2430]/14' },
  { id: 5, text: 'œ', xStart: 72, delay: 5, duration: 34, size: 'text-4xl', color: 'text-[#1F3A5F]/18' },
  { id: 6, text: 'à', xStart: 86, delay: 1, duration: 27, size: 'text-3xl', color: 'text-[#152A47]/15' },
  { id: 7, text: 'è', xStart: 16, delay: 9, duration: 31, size: 'text-4xl', color: 'text-[#1F3A5F]/14' },
  { id: 8, text: 'î', xStart: 34, delay: 11, duration: 29, size: 'text-3xl', color: 'text-[#8A2430]/12' },
  { id: 9, text: 'ô', xStart: 66, delay: 7, duration: 33, size: 'text-4xl', color: 'text-[#1F3A5F]/16' },
  { id: 10, text: '—', xStart: 80, delay: 4, duration: 35, size: 'text-2xl', color: 'text-[#152A47]/14' },
  { id: 11, text: 'ù', xStart: 50, delay: 8, duration: 28, size: 'text-3xl', color: 'text-[#1F3A5F]/15' },
  { id: 12, text: 'ë', xStart: 92, delay: 12, duration: 30, size: 'text-4xl', color: 'text-[#1F3A5F]/14' },
];

// Soft ambient study motes (warm sunlight drifting in an atelier)
const STUDY_MOTES = [
  { id: 1, left: '14%', top: '22%', delay: 0, duration: 18, size: 'w-2 h-2' },
  { id: 2, left: '32%', top: '68%', delay: 3, duration: 22, size: 'w-2.5 h-2.5' },
  { id: 3, left: '52%', top: '16%', delay: 1.5, duration: 20, size: 'w-2 h-2' },
  { id: 4, left: '68%', top: '74%', delay: 4, duration: 24, size: 'w-1.5 h-1.5' },
  { id: 5, left: '84%', top: '32%', delay: 2, duration: 19, size: 'w-2 h-2' },
  { id: 6, left: '90%', top: '82%', delay: 5, duration: 21, size: 'w-2.5 h-2.5' },
];

// Elegant atelier drafting rings (subtle linguistic / geometrical coordinate circles)
const DRAFTING_RINGS = [
  { id: 1, left: '8%', top: '18%', size: 'w-64 h-64', duration: 48, clockwise: true },
  { id: 2, left: '76%', top: '55%', size: 'w-80 h-80', duration: 54, clockwise: false },
  { id: 3, left: '42%', top: '78%', size: 'w-56 h-56', duration: 42, clockwise: true },
];

const AnimatedBackgroundBase = ({ isPaused = false }) => {
  return (
    <div
      aria-hidden="true"
      id="atelier-animated-background"
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden transform-gpu will-change-transform select-none ${
        isPaused ? 'is-paused' : ''
      }`}
      style={{ isolation: 'isolate', contain: 'strict', transform: 'translateZ(0)' }}
    >
      {/* 1. Atelier Ambient Light Pools — perfectly harmonized with #F7F2E7 base palette */}
      {/* Warm Ivory & Parchment Light Pool (Top Left) */}
      <div className="atelier-blob-1 absolute -top-[12%] -left-[10%] w-[58vw] h-[58vw] rounded-full bg-gradient-to-br from-[#FFFDF8]/70 via-[#FAF5EC]/45 to-transparent blur-3xl" />

      {/* French Olive & Atelier Sage Pool (Top Right) */}
      <div className="atelier-blob-2 absolute top-[3%] -right-[10%] w-[52vw] h-[52vw] rounded-full bg-gradient-to-bl from-[#E6EDE0]/55 via-[#EEF2E8]/35 to-transparent blur-3xl" />

      {/* Terracotta & Warm Parchment Subtle Glow (Bottom Center-Left) */}
      <div className="atelier-blob-3 absolute -bottom-[16%] left-[8%] w-[56vw] h-[56vw] rounded-full bg-gradient-to-tr from-[#F8EDE6]/50 via-[#F4E9E2]/30 to-transparent blur-3xl" />

      {/* Alabaster & Warm Linen Depth (Bottom Right) */}
      <div className="atelier-blob-4 absolute -bottom-[12%] -right-[8%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tl from-[#EDECE4]/55 via-[#F6F5EC]/35 to-transparent blur-3xl" />

      {/* 2. Atelier Drafting Paper Grid Overlay (Papier Vélin / Carnet d'Étude) */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            radial-gradient(#1F3A5F 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
        }}
      />

      {/* 3. Subtle Rotating Drafting Rings (Linguistic Syntactic Compasses) */}
      <div className="absolute inset-0 overflow-hidden">
        {DRAFTING_RINGS.map((ring) => (
          <div
            key={`drafting-ring-${ring.id}`}
            className={`absolute rounded-full border border-dashed border-[#1F3A5F]/[0.07] ${ring.size} ${
              ring.clockwise ? 'atelier-ring-cw' : 'atelier-ring-ccw'
            }`}
            style={{ left: ring.left, top: ring.top, animationDuration: `${ring.duration}s` }}
          >
            {/* Inner concentric fine ring */}
            <div className="absolute inset-4 rounded-full border border-[#1F3A5F]/[0.04]" />
          </div>
        ))}
      </div>

      {/* 4. French Grammatical & Typographical Diacritics Drifting Gently */}
      <div
        className={`absolute inset-0 overflow-hidden transition-opacity duration-300 ${
          isPaused ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {!isPaused &&
          TYPOGRAPHIC_GLYPHS.map((glyph) => (
            <div
              key={`glyph-${glyph.id}`}
              className={`absolute top-0 font-serif font-normal select-none pointer-events-none ${glyph.size} ${
                glyph.color
              } ${glyph.id % 2 === 0 ? 'atelier-glyph-even' : 'atelier-glyph-odd'}`}
              style={{
                left: `${glyph.xStart}vw`,
                animationDuration: `${glyph.duration}s`,
                animationDelay: `${glyph.delay}s`,
              }}
            >
              {glyph.text}
            </div>
          ))}
      </div>

      {/* 5. Golden Atelier Study Motes (Lumière de Bibliothèque) */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isPaused ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {!isPaused &&
          STUDY_MOTES.map((mote) => (
            <div
              key={`study-mote-${mote.id}`}
              className={`atelier-mote absolute rounded-full bg-gradient-to-br from-[#C23B3B]/40 to-[#1F3A5F]/30 blur-[0.5px] ${mote.size}`}
              style={{
                left: mote.left,
                top: mote.top,
                animationDuration: `${mote.duration}s`,
                animationDelay: `${mote.delay}s`,
              }}
            />
          ))}
      </div>
    </div>
  );
};

// Only the modal state drives this component, so skip re-rendering it on scroll-driven App updates.
export const AnimatedBackground = memo(AnimatedBackgroundBase);
