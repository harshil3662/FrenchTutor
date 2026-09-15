import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Leaf, Flower2, Sprout, Sparkles, Sun } from 'lucide-react';

export const AnimatedBackground = () => {
  // Garden petals & leaves floating config with vivid organic garden tones
  const gardenElements = useMemo(
    () => [
      { id: 1, type: 'leaf', xStart: 8, delay: 0, duration: 22, size: 24, color: 'text-[#4A723D]/65' },
      { id: 2, type: 'petal', xStart: 22, delay: 3, duration: 26, size: 20, color: 'text-[#D07070]/60' },
      { id: 3, type: 'leaf', xStart: 38, delay: 7, duration: 20, size: 26, color: 'text-[#58804A]/60' },
      { id: 4, type: 'petal', xStart: 54, delay: 2, duration: 24, size: 18, color: 'text-[#D88282]/55' },
      { id: 5, type: 'sprout', xStart: 68, delay: 5, duration: 23, size: 22, color: 'text-[#4F7842]/65' },
      { id: 6, type: 'leaf', xStart: 82, delay: 1, duration: 21, size: 22, color: 'text-[#476E3A]/65' },
      { id: 7, type: 'petal', xStart: 92, delay: 4, duration: 25, size: 19, color: 'text-[#CD6A6A]/60' },
      { id: 8, type: 'leaf', xStart: 15, delay: 9, duration: 20, size: 28, color: 'text-[#527A45]/60' },
      { id: 9, type: 'sprout', xStart: 45, delay: 11, duration: 22, size: 20, color: 'text-[#4D7540]/65' },
      { id: 10, type: 'petal', xStart: 76, delay: 8, duration: 27, size: 21, color: 'text-[#D57B7B]/55' },
    ],
    []
  );

  // Sunlight pollen / garden sparkles
  const pollenMotes = useMemo(
    () => [
      { id: 1, left: '12%', top: '25%', delay: 0, duration: 14 },
      { id: 2, left: '28%', top: '65%', delay: 3, duration: 18 },
      { id: 3, left: '48%', top: '18%', delay: 1.5, duration: 16 },
      { id: 4, left: '62%', top: '72%', delay: 4, duration: 20 },
      { id: 5, left: '78%', top: '35%', delay: 2, duration: 15 },
      { id: 6, left: '88%', top: '80%', delay: 5, duration: 17 },
    ],
    []
  );

  // French Linguistic Accents drifting gently like garden breeze
  const linguisticAccents = useMemo(
    () => [
      { text: '« »', top: '14%', left: '7%', delay: 0, duration: 22 },
      { text: 'ê', top: '26%', left: '89%', delay: 2, duration: 24 },
      { text: 'œ', top: '64%', left: '4%', delay: 4, duration: 21 },
      { text: 'ç', top: '76%', left: '91%', delay: 1, duration: 20 },
      { text: 'à', top: '46%', left: '93%', delay: 3, duration: 25 },
      { text: 'î', top: '84%', left: '38%', delay: 5, duration: 23 },
    ],
    []
  );

  return (
    <div
      aria-hidden="true"
      id="garden-animated-background"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Garden Canopy Ambient Gradients */}
      {/* 1. Lush Botanical Green Canopy (Top Left) */}
      <motion.div
        animate={{
          x: [0, 40, -30, 20, 0],
          y: [0, -45, 25, -20, 0],
          scale: [1, 1.12, 0.96, 1.06, 1],
          rotate: [0, 20, 45, 20, 0],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-[#D8E6CC]/70 via-[#E4EFE0]/50 to-transparent blur-3xl"
      />

      {/* 2. Soft Warm Sunbeam & Floral Garden Aura (Top Right) */}
      <motion.div
        animate={{
          x: [0, -50, 35, -25, 0],
          y: [0, 40, -40, 30, 0],
          scale: [1, 0.92, 1.15, 0.98, 1],
          rotate: [0, -25, -50, -25, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[5%] -right-[12%] w-[52vw] h-[52vw] rounded-full bg-gradient-to-bl from-[#FFF6DF]/75 via-[#F7ECE4]/50 to-transparent blur-3xl"
      />

      {/* 3. Deep Herbal Moss & Sage Field (Bottom Center-Left) */}
      <motion.div
        animate={{
          x: [0, 35, -25, 40, 0],
          y: [0, 35, 60, -25, 0],
          scale: [0.95, 1.08, 1, 1.14, 0.95],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-[20%] left-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-[#CCE0BE]/60 via-[#E6F0DC]/45 to-transparent blur-3xl"
      />

      {/* 4. Delicate Rose Garden Blossom Glow (Bottom Right) */}
      <motion.div
        animate={{
          x: [0, -30, 20, -15, 0],
          y: [0, -30, 35, -20, 0],
          scale: [1, 1.08, 0.94, 1.05, 1],
        }}
        transition={{
          duration: 27,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-[15%] -right-[10%] w-[48vw] h-[48vw] rounded-full bg-gradient-to-tl from-[#F4E3E3]/55 via-[#EBF2E4]/40 to-transparent blur-3xl"
      />

      {/* Dappled Sunlight Motes (Jardin Lumière) */}
      <div className="absolute inset-0">
        {[
          { left: '20%', top: '15%', size: 'w-48 h-48', delay: 0 },
          { left: '65%', top: '28%', size: 'w-56 h-56', delay: 3 },
          { left: '40%', top: '65%', size: 'w-52 h-52', delay: 6 },
          { left: '80%', top: '75%', size: 'w-44 h-44', delay: 2 },
        ].map((orb, i) => (
          <motion.div
            key={`sun-orb-${i}`}
            animate={{
              opacity: [0.35, 0.7, 0.35],
              scale: [0.9, 1.15, 0.9],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: orb.delay,
            }}
            className={`absolute rounded-full bg-gradient-to-br from-[#FFFDEB]/60 to-[#E8F2DC]/30 blur-2xl ${orb.size}`}
            style={{ left: orb.left, top: orb.top }}
          />
        ))}
      </div>

      {/* Garden Conservatory Trellis Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            radial-gradient(#486B40 1.2px, transparent 1.2px),
            linear-gradient(45deg, transparent 48%, #5A7A50 49%, #5A7A50 51%, transparent 52%),
            linear-gradient(-45deg, transparent 48%, #5A7A50 49%, #5A7A50 51%, transparent 52%)
          `,
          backgroundSize: '48px 48px, 48px 48px, 48px 48px',
        }}
      />

      {/* Floating Garden Leaves, Blossoms, and Sprouts */}
      <div className="absolute inset-0 overflow-hidden">
        {gardenElements.map((el) => {
          return (
            <motion.div
              key={`garden-el-${el.id}`}
              initial={{
                y: '-8vh',
                x: `${el.xStart}vw`,
                opacity: 0,
                rotate: 0,
              }}
              animate={{
                y: ['-5vh', '108vh'],
                x: [
                  `${el.xStart}vw`,
                  `${el.xStart + (el.id % 2 === 0 ? 5 : -5)}vw`,
                  `${el.xStart + (el.id % 2 === 0 ? -3 : 4)}vw`,
                  `${el.xStart + (el.id % 2 === 0 ? 6 : -6)}vw`,
                ],
                opacity: [0, 0.85, 0.85, 0],
                rotate: [0, el.id % 2 === 0 ? 180 : -180, el.id % 2 === 0 ? 360 : -360],
              }}
              transition={{
                duration: el.duration,
                repeat: Infinity,
                delay: el.delay,
                ease: 'linear',
              }}
              className={`absolute select-none pointer-events-none ${el.color}`}
            >
              {el.type === 'leaf' && (
                <Leaf
                  style={{ width: el.size, height: el.size }}
                  strokeWidth={1.5}
                />
              )}
              {el.type === 'petal' && (
                <Flower2
                  style={{ width: el.size, height: el.size }}
                  strokeWidth={1.5}
                />
              )}
              {el.type === 'sprout' && (
                <Sprout
                  style={{ width: el.size, height: el.size }}
                  strokeWidth={1.5}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Garden Pollen & Golden Light Sparkles */}
      <div className="absolute inset-0">
        {pollenMotes.map((mote) => (
          <motion.div
            key={`pollen-${mote.id}`}
            animate={{
              y: [0, -35, 0],
              x: [0, 15, -10, 0],
              opacity: [0.2, 0.75, 0.2],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: mote.duration,
              delay: mote.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute flex items-center justify-center text-[#9BBF82]/50"
            style={{ left: mote.left, top: mote.top }}
          >
            <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
          </motion.div>
        ))}
      </div>

      {/* Subtle French Linguistic Accents Weaving Through the Garden */}
      <div className="absolute inset-0 opacity-[0.25]">
        {linguisticAccents.map((item, idx) => (
          <motion.div
            key={`ling-accent-${idx}`}
            initial={{ opacity: 0.15 }}
            animate={{
              y: [0, -22, 0],
              x: [0, 14, 0],
              opacity: [0.15, 0.45, 0.15],
              rotate: [0, 8, -8, 0],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute font-serif text-3xl md:text-5xl font-bold text-[#4B6B42]/35 select-none"
            style={{ top: item.top, left: item.left }}
          >
            {item.text}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
