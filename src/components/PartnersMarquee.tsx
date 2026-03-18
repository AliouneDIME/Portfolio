import { memo } from 'react';

/* ─── Inline SVG logos — pixel-faithful reproductions ────────
   Based on uploaded reference images. All inline, no CDN.
──────────────────────────────────────────────────────────── */

const PARTNERS = [
  /* 1. UN-CHK + FORCE-N ─────────────────────────────────── */
  {
    name: 'UN-CHK & FORCE-N',
    svg: (
      <svg viewBox="0 0 300 72" fill="none" xmlns="http://www.w3.org/2000/svg" width="260" height="60">
        {/* UN logo — interlinked U and N curves in blue+green */}
        {/* Left U */}
        <path d="M12 14 L12 42 Q12 56 24 56 Q36 56 36 42 L36 14" stroke="#1e88d8" strokeWidth="5" fill="none" strokeLinecap="round"/>
        {/* Middle N */}
        <path d="M22 14 L22 42 Q22 56 34 56 Q46 56 46 42 L46 14" stroke="#2cb462" strokeWidth="5" fill="none" strokeLinecap="round"/>
        {/* Right overlap */}
        <path d="M32 18 L32 46 Q32 58 44 58 Q56 58 56 44 L56 18" stroke="#e67e22" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        {/* Subtitle */}
        <text x="12" y="67" fontFamily="'Arial', sans-serif" fontSize="6.5" fontWeight="400" fill="#555">Université numérique</text>
        <text x="12" y="75" fontFamily="'Arial', sans-serif" fontSize="6" fontWeight="700" fill="#333" letterSpacing="0.3">CHEIKH HAMIDOU KANE</text>

        {/* FORCE text */}
        <text x="78" y="45" fontFamily="'Arial Black', sans-serif" fontSize="26" fontWeight="900" fill="#1e88d8">FORCE</text>

        {/* N glyph — orange left triangle + blue right stroke + green bottom triangle */}
        <polygon points="178,12 178,58 192,58 192,28 206,58 220,58 220,12 206,12 206,42 192,12" fill="#1e88d8"/>
        {/* Orange fill top-left */}
        <polygon points="178,14 192,14 178,40" fill="#e67e22"/>
        {/* Green fill bottom-right */}
        <polygon points="206,32 220,14 220,58 206,58" fill="#2cb462"/>
        {/* Pixel dots top-right */}
        <rect x="214" y="6" width="3" height="3" rx="0.5" fill="#1e88d8"/>
        <rect x="219" y="3" width="2.5" height="2.5" rx="0.5" fill="#1e88d8"/>
        <rect x="223" y="7" width="2" height="2" rx="0.5" fill="#1e88d8"/>
        <rect x="219" y="10" width="2" height="2" rx="0.5" fill="#1e88d8"/>

        {/* Tagline */}
        <text x="78" y="64" fontFamily="'Georgia', serif" fontStyle="italic" fontSize="10" fill="#e67e22">sa ëllëg ci xarala</text>
      </svg>
    ),
  },

  /* 2. University of Maryland globe ─────────────────────── */
  {
    name: 'University of Maryland (Coursera)',
    svg: (
      <svg viewBox="0 0 220 72" fill="none" xmlns="http://www.w3.org/2000/svg" width="200" height="60">
        {/* Globe with Maryland flag quadrant design */}
        <defs>
          <clipPath id="md-globe"><circle cx="34" cy="36" r="30"/></clipPath>
        </defs>
        <circle cx="34" cy="36" r="30" fill="#111"/>

        <g clipPath="url(#md-globe)">
          {/* Q1 top-left: yellow + black diagonal */}
          <rect x="4" y="6" width="30" height="30" fill="#FFD700"/>
          <polygon points="4,6 34,6 4,36" fill="#1a1a1a"/>
          <polygon points="34,6 34,36 22,22" fill="#1a1a1a"/>

          {/* Q2 top-right: red/white with trefoil */}
          <rect x="34" y="6" width="30" height="30" fill="#CC0000"/>
          <rect x="34" y="6" width="30" height="30" fill="white" opacity="0"/>
          {/* Cross lines */}
          <line x1="34" y1="6" x2="64" y2="36" stroke="white" strokeWidth="3" opacity="0.9"/>
          <line x1="64" y1="6" x2="34" y2="36" stroke="white" strokeWidth="3" opacity="0.9"/>
          {/* trefoils (simplified circles) */}
          <circle cx="40" cy="12" r="4" fill="white" opacity="0.8"/>
          <circle cx="58" cy="12" r="4" fill="white" opacity="0.8"/>
          <circle cx="49" cy="28" r="5" fill="white" opacity="0.8"/>

          {/* Q3 bottom-left: red/white */}
          <rect x="4" y="36" width="30" height="30" fill="#CC0000"/>
          <line x1="4" y1="36" x2="34" y2="66" stroke="white" strokeWidth="3" opacity="0.9"/>
          <line x1="34" y1="36" x2="4" y2="66" stroke="white" strokeWidth="3" opacity="0.9"/>
          <circle cx="11" cy="44" r="4" fill="white" opacity="0.8"/>
          <circle cx="18" cy="58" r="5" fill="white" opacity="0.8"/>

          {/* Q4 bottom-right: yellow/black */}
          <rect x="34" y="36" width="30" height="30" fill="#FFD700"/>
          <polygon points="34,36 64,36 64,66" fill="#1a1a1a"/>
          <polygon points="34,36 34,66 50,50" fill="#1a1a1a"/>
        </g>

        {/* Globe meridian lines */}
        <ellipse cx="34" cy="36" rx="15" ry="30" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" fill="none"/>
        <ellipse cx="34" cy="36" rx="25" ry="30" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" fill="none"/>
        <line x1="4" y1="36" x2="64" y2="36" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
        <circle cx="34" cy="36" r="30" stroke="#444" strokeWidth="1" fill="none"/>

        {/* Text */}
        <text x="76" y="26" fontFamily="'Arial', sans-serif" fontWeight="600" fontSize="10" fill="rgba(255,255,255,0.7)">University of</text>
        <text x="76" y="44" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="15" fill="#FFD700">Maryland</text>
        <text x="76" y="60" fontFamily="'Arial', sans-serif" fontSize="8.5" fill="rgba(255,255,255,0.4)">via Coursera</text>
      </svg>
    ),
  },

  /* 3. AWS Training ──────────────────────────────────────── */
  {
    name: 'AWS Training & Certification',
    svg: (
      <svg viewBox="0 0 200 72" fill="none" xmlns="http://www.w3.org/2000/svg" width="180" height="58">
        <rect x="1" y="1" width="198" height="70" rx="5" fill="#232F3E"/>
        {/* "aws" wordmark */}
        <text x="14" y="48" fontFamily="'Amazon Ember', 'Arial', sans-serif" fontWeight="800" fontSize="34" fill="white" letterSpacing="-1">aws</text>
        {/* Signature orange smile arrow */}
        <path d="M14 56 Q55 71 96 56" stroke="#FF9900" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        <path d="M91 51.5 L96 56.5 L91 61" stroke="#FF9900" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Right column text */}
        <text x="108" y="32" fontFamily="'Arial', sans-serif" fontSize="8.5" fontWeight="500" fill="rgba(255,255,255,0.55)">Training and</text>
        <text x="108" y="45" fontFamily="'Arial', sans-serif" fontSize="9" fontWeight="700" fill="rgba(255,255,255,0.9)">Certification</text>
      </svg>
    ),
  },

  /* 4. CodeSignal ────────────────────────────────────────── */
  {
    name: 'CodeSignal',
    svg: (
      <svg viewBox="0 0 220 72" fill="none" xmlns="http://www.w3.org/2000/svg" width="200" height="58">
        {/* CodeSignal logo — downward pointing chevron/shield with inner F-like shape */}
        {/* Outer triangle/chevron */}
        <path d="M10 10 L44 10 L44 18 L28 40 L12 18 L12 10 Z" fill="#2462FF"/>
        {/* Inner horizontal bars (like a stylized F/flag) */}
        <rect x="16" y="13" width="20" height="4" rx="1" fill="white"/>
        <rect x="16" y="20" width="14" height="4" rx="1" fill="white"/>
        {/* Right wing */}
        <path d="M44 10 L58 10 L58 18 L44 28 L44 18 Z" fill="#2462FF" opacity="0.6"/>
        {/* Text */}
        <text x="70" y="44" fontFamily="'-apple-system', 'Helvetica Neue', sans-serif"
          fontWeight="700" fontSize="22" fill="#111827" letterSpacing="-0.3">Code</text>
        <text x="127" y="44" fontFamily="'-apple-system', 'Helvetica Neue', sans-serif"
          fontWeight="700" fontSize="22" fill="#111827" letterSpacing="-0.3">Signal</text>
      </svg>
    ),
  },

  /* 5. Mastercard Foundation ─────────────────────────────── */
  {
    name: 'Mastercard Foundation',
    svg: (
      <svg viewBox="0 0 190 72" fill="none" xmlns="http://www.w3.org/2000/svg" width="170" height="56">
        {/* Two overlapping circles */}
        <circle cx="30" cy="36" r="24" fill="#EB001B"/>
        <circle cx="56" cy="36" r="24" fill="#F79E1B"/>
        {/* Overlap blend — orange in middle */}
        <path d="M43 15.5 A24 24 0 0 1 43 56.5 A24 24 0 0 1 43 15.5Z" fill="#FF5F00"/>
        {/* Text */}
        <text x="90" y="29" fontFamily="'Arial', sans-serif" fontWeight="800" fontSize="12" fill="#333">Mastercard</text>
        <text x="90" y="46" fontFamily="'Arial', sans-serif" fontWeight="600" fontSize="11" fill="#666">Foundation</text>
      </svg>
    ),
  },
];

const DOUBLED = [...PARTNERS, ...PARTNERS];

export const PartnersMarquee = memo(function PartnersMarquee() {
  return (
    <div className="relative overflow-hidden py-5">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #06060c 0%, transparent 100%)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(-90deg, #06060c 0%, transparent 100%)' }} />

      <div className="flex items-center gap-20 w-max"
        style={{ animation: 'marquee 38s linear infinite' }}>
        {DOUBLED.map((p, i) => (
          <div key={i} title={p.name}
            className="flex-none opacity-50 hover:opacity-100 transition-all duration-300
                       hover:scale-105 flex items-center">
            {p.svg}
          </div>
        ))}
      </div>
    </div>
  );
});