import React from 'react';

export const Footer = () => {
  return (
    <footer id="app-footer" className="relative z-10 mt-auto bg-transparent overflow-hidden">
      {/* Illustrative French architectural skyline (no borders on top or bottom) */}
      <div className="relative w-full h-32 sm:h-40 md:h-48 overflow-hidden bg-gradient-to-b from-transparent via-[#EAE6DF]/30 to-[#DFDAD1]/60">
        {/* Soft atmospheric sky glow */}
        <div className="absolute inset-0 bg-radial from-[#FFFDF2]/60 via-transparent to-transparent pointer-events-none" />

        {/* Detailed French Architectural Vector Skyline (Eiffel Tower, Notre-Dame, Arc de Triomphe, Louvre, Sacré-Cœur, Mansard Roofs) */}
        <svg
          viewBox="0 0 1440 220"
          className="absolute inset-0 w-full h-full text-[#4A4A35]/35 preserve-3d pointer-events-none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Background Layer (Distant Monuments & Atmospheric Depth) */}
          <g fill="currentColor" opacity="0.45">
            {/* Montmartre / Sacré-Cœur Basilica silhouette (Left-Center) */}
            <path d="M 280 180 Q 280 130 320 130 Q 360 130 360 180 Z" />
            <path d="M 315 130 L 315 105 L 325 105 L 325 130 Z" />
            <circle cx="320" cy="100" r="14" />
            <line x1="320" y1="84" x2="320" y2="72" stroke="currentColor" strokeWidth="2.5" />
            <line x1="316" y1="76" x2="324" y2="76" stroke="currentColor" strokeWidth="2" />
            {/* Side domes */}
            <ellipse cx="295" cy="148" rx="14" ry="18" />
            <ellipse cx="345" cy="148" rx="14" ry="18" />

            {/* Invalides Dome (Right-Center) */}
            <path d="M 980 180 Q 980 120 1020 120 Q 1060 120 1060 180 Z" />
            <ellipse cx="1020" cy="115" rx="20" ry="25" />
            <rect x="1016" y="80" width="8" height="20" />
            <line x1="1020" y1="80" x2="1020" y2="65" stroke="currentColor" strokeWidth="2.5" />

            {/* Distant Haussmann building blocks */}
            <rect x="0" y="160" width="160" height="60" />
            <rect x="160" y="150" width="110" height="70" />
            <rect x="370" y="162" width="180" height="58" />
            <rect x="850" y="155" width="120" height="65" />
            <rect x="1070" y="160" width="160" height="60" />
            <rect x="1230" y="150" width="210" height="70" />
          </g>

          {/* Foreground Architectural Silhouette Layer */}
          <g fill="currentColor" opacity="0.85">
            {/* Far Left: Arc de Triomphe */}
            <path d="M 50 220 L 50 128 L 130 128 L 130 220 L 110 220 L 110 162 Q 90 148 70 162 L 70 220 Z" />
            <rect x="46" y="122" width="88" height="8" rx="2" />
            <rect x="58" y="136" width="16" height="22" rx="1" fill="#DFDAD1" opacity="0.5" />
            <rect x="106" y="136" width="16" height="22" rx="1" fill="#DFDAD1" opacity="0.5" />

            {/* Classic Parisian Haussmann row with dormers & chimneys */}
            <rect x="145" y="145" width="130" height="75" />
            <polygon points="142,145 155,130 270,130 278,145" />
            {/* Dormer windows */}
            <rect x="165" y="133" width="8" height="10" rx="1" fill="#DFDAD1" />
            <rect x="195" y="133" width="8" height="10" rx="1" fill="#DFDAD1" />
            <rect x="225" y="133" width="8" height="10" rx="1" fill="#DFDAD1" />
            <rect x="250" y="133" width="8" height="10" rx="1" fill="#DFDAD1" />
            {/* Chimney pots */}
            <rect x="156" y="122" width="5" height="10" />
            <rect x="206" y="122" width="5" height="10" />
            <rect x="265" y="122" width="5" height="10" />

            {/* Notre-Dame Cathedral Twin Towers (Center-Left) */}
            <rect x="420" y="115" width="30" height="105" />
            <rect x="480" y="115" width="30" height="105" />
            <rect x="450" y="145" width="30" height="75" />
            <circle cx="465" cy="168" r="10" fill="#DFDAD1" opacity="0.7" />
            {/* Spire */}
            <polygon points="463,145 465,85 467,145" />

            {/* Center Stage: ICONIC EIFFEL TOWER (Tour Eiffel) */}
            {/* Base arches & legs */}
            <path d="M 640 220 L 685 140 L 715 140 L 760 220 L 744 220 L 728 178 Q 700 156 672 178 L 656 220 Z" />
            {/* First Platform */}
            <rect x="678" y="136" width="44" height="6" rx="1" />
            {/* Second Tier */}
            <polygon points="682,136 693,82 707,82 718,136" />
            {/* Second Platform */}
            <rect x="690" y="78" width="20" height="5" rx="1" />
            {/* Top Spire & Lantern */}
            <polygon points="695,78 698,22 702,22 705,78" />
            <line x1="700" y1="22" x2="700" y2="8" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="700" cy="7" r="2.5" />

            {/* Louvre Glass Pyramid (Center-Right) */}
            <polygon points="815,220 855,160 895,220" opacity="0.85" />
            <line x1="855" y1="160" x2="855" y2="220" stroke="#DFDAD1" strokeWidth="1.5" />
            <line x1="835" y1="190" x2="875" y2="190" stroke="#DFDAD1" strokeWidth="1.5" />

            {/* Louvre Renaissance Palace Colonnade */}
            <rect x="895" y="148" width="130" height="72" />
            <polygon points="892,148 905,134 1020,134 1028,148" />
            <rect x="915" y="156" width="8" height="24" rx="2" fill="#DFDAD1" opacity="0.6" />
            <rect x="940" y="156" width="8" height="24" rx="2" fill="#DFDAD1" opacity="0.6" />
            <rect x="965" y="156" width="8" height="24" rx="2" fill="#DFDAD1" opacity="0.6" />
            <rect x="990" y="156" width="8" height="24" rx="2" fill="#DFDAD1" opacity="0.6" />

            {/* Haussmann Residential Boulevard Buildings & Classic Lamp Posts (Right) */}
            <rect x="1035" y="140" width="150" height="80" />
            <polygon points="1030,140 1045,124 1180,124 1190,140" />
            <rect x="1060" y="128" width="10" height="12" rx="1" fill="#DFDAD1" />
            <rect x="1095" y="128" width="10" height="12" rx="1" fill="#DFDAD1" />
            <rect x="1130" y="128" width="10" height="12" rx="1" fill="#DFDAD1" />
            <rect x="1165" y="128" width="10" height="12" rx="1" fill="#DFDAD1" />
            {/* Mansard dormers and balconies */}
            <rect x="1045" y="158" width="130" height="4" fill="#34342E" opacity="0.3" />
            <rect x="1045" y="180" width="130" height="4" fill="#34342E" opacity="0.3" />

            {/* Far Right: Classic French Pavillon */}
            <rect x="1200" y="132" width="110" height="88" />
            <polygon points="1195,132 1210,116 1300,116 1315,132" />
            <circle cx="1255" cy="155" r="8" fill="#DFDAD1" opacity="0.7" />

            <rect x="1325" y="148" width="115" height="72" />

            {/* Manicured French Garden Trees & Boxwood Topiaries in Foreground */}
            <ellipse cx="38" cy="216" rx="12" ry="7" fill="#4B6B42" opacity="0.9" />
            <ellipse cx="295" cy="216" rx="10" ry="6" fill="#4B6B42" opacity="0.9" />
            <ellipse cx="405" cy="216" rx="11" ry="7" fill="#4B6B42" opacity="0.9" />
            <ellipse cx="625" cy="217" rx="14" ry="8" fill="#4B6B42" opacity="0.9" />
            <ellipse cx="778" cy="217" rx="14" ry="8" fill="#4B6B42" opacity="0.9" />
            <ellipse cx="802" cy="217" rx="10" ry="6" fill="#4B6B42" opacity="0.9" />
            <ellipse cx="1026" cy="216" rx="12" ry="7" fill="#4B6B42" opacity="0.9" />
            <ellipse cx="1320" cy="216" rx="14" ry="8" fill="#4B6B42" opacity="0.9" />
          </g>
        </svg>
      </div>
    </footer>
  );
};
