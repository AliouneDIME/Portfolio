import { useEffect, useRef, lazy, Suspense } from 'react';
import { Header }   from './components/layout/Header';
import { Footer }   from './components/layout/Footer';
import { Hero }     from './components/Hero';
import { StarField } from './components/decorative/StarField';

/**
 * All sections below the fold are lazy-loaded.
 * Vite splits each into its own JS chunk — the initial bundle
 * only contains react, framer-motion, Header, Hero, StarField.
 */
const About          = lazy(() => import('./components/About/About').then(m => ({ default: m.About })));
const Experience     = lazy(() => import('./components/Experience/Experience').then(m => ({ default: m.Experience })));
const Services       = lazy(() => import('./components/Services/Services').then(m => ({ default: m.Services })));
const Certifications = lazy(() => import('./components/Certifications').then(m => ({ default: m.Certifications })));
const Projects       = lazy(() => import('./components/Projects').then(m => ({ default: m.Projects })));
const Skills         = lazy(() => import('./components/Skills').then(m => ({ default: m.Skills })));
const ITAdmin        = lazy(() => import('./components/Itadmin').then(m => ({ default: m.ITAdmin })));
const Blog           = lazy(() => import('./components/blog').then(m => ({ default: m.Blog })));
const Contact        = lazy(() => import('./components/Contact').then(m => ({ default: m.Contact })));

/** Minimal placeholder while a lazy section loads */
function SectionSkeleton() {
  return <div className="h-28 w-full" aria-hidden="true" />;
}

export default function App() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  /** Custom cursor — smooth lag ring via rAF, zero React state */
  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0, id: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      // Dot follows instantly (no lag feels snappy)
      dot.style.transform = `translate(${mx - 4}px,${my - 4}px)`;
    };

    const tick = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.transform = `translate(${Math.round(rx - 18)}px,${Math.round(ry - 18)}px)`;
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <>
      {/* ── Custom cursor (hidden on touch devices via CSS) ── */}
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />

      {/* ── Atmosphere layers (fixed, cheap, composited) ── */}
      <div className="noise"     aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
      <StarField />

      {/* ── Background grid (static, no repaints) ── */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(201,168,76,0.03) 1px,transparent 1px),' +
            'linear-gradient(90deg,rgba(201,168,76,0.03) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* ── Page ── */}
      <div className="relative z-10">
        <Header />
        <main>
          {/* Above the fold — no Suspense needed */}
          <Hero />

          {/* Below the fold — each in its own Suspense boundary */}
          <Suspense fallback={<SectionSkeleton />}><About /></Suspense>
          <Suspense fallback={<SectionSkeleton />}><Experience /></Suspense>
          <Suspense fallback={<SectionSkeleton />}><Services /></Suspense>
          <Suspense fallback={<SectionSkeleton />}><Certifications /></Suspense>
          <Suspense fallback={<SectionSkeleton />}><Projects /></Suspense>
          <Suspense fallback={<SectionSkeleton />}><Skills /></Suspense>
          <Suspense fallback={<SectionSkeleton />}><ITAdmin /></Suspense>
          <Suspense fallback={<SectionSkeleton />}><Blog /></Suspense>
          <Suspense fallback={<SectionSkeleton />}><Contact /></Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
}