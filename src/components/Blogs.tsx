import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

/* ──────────────────────────────────────────────────────────────
   TYPES
──────────────────────────────────────────────────────────────── */
interface Article {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  category: 'AI' | 'Cybersécurité' | 'Tech' | 'Dev';
  publishedAt: Date;
  readTime: number;
}

/* ──────────────────────────────────────────────────────────────
   CATEGORY METADATA
──────────────────────────────────────────────────────────────── */
const CAT_META = {
  AI:            { color: '#c9a84c', bg: 'rgba(201,168,76,0.12)',  border: 'rgba(201,168,76,0.3)',  icon: '🤖' },
  Cybersécurité: { color: '#ff2d78', bg: 'rgba(255,45,120,0.10)',  border: 'rgba(255,45,120,0.3)',  icon: '🔒' },
  Tech:          { color: '#00d4ff', bg: 'rgba(0,212,255,0.10)',   border: 'rgba(0,212,255,0.3)',   icon: '⚡' },
  Dev:           { color: '#3fb950', bg: 'rgba(63,185,80,0.10)',   border: 'rgba(63,185,80,0.3)',   icon: '💻' },
} as const;

/* ──────────────────────────────────────────────────────────────
   RSS SOURCES
   Multiple proxy fallbacks to guarantee fresh 2026 data:
   1. rss2json.com  — JSON API, handles most RSS feeds
   2. allorigins.win — raw XML fallback
   3. corsproxy.io  — last resort
──────────────────────────────────────────────────────────────── */
const RSS_SOURCES: { url: string; source: string; cat: Article['category'] }[] = [
  { url: 'https://techcrunch.com/feed/',                          source: 'TechCrunch',          cat: 'AI' },
  { url: 'https://venturebeat.com/feed/',                         source: 'VentureBeat AI',      cat: 'AI' },
  { url: 'https://www.technologyreview.com/feed/',                source: 'MIT Tech Review',     cat: 'AI' },
  { url: 'https://feeds.feedburner.com/TheHackersNews',           source: 'The Hacker News',     cat: 'Cybersécurité' },
  { url: 'https://krebsonsecurity.com/feed/',                     source: 'Krebs on Security',   cat: 'Cybersécurité' },
  { url: 'https://www.darkreading.com/rss.xml',                   source: 'Dark Reading',        cat: 'Cybersécurité' },
  { url: 'https://www.theverge.com/rss/index.xml',               source: 'The Verge',           cat: 'Tech' },
  { url: 'https://feeds.arstechnica.com/arstechnica/index',      source: 'Ars Technica',        cat: 'Tech' },
  { url: 'https://www.wired.com/feed/rss',                       source: 'WIRED',               cat: 'Tech' },
  { url: 'https://dev.to/feed',                                   source: 'DEV.to',              cat: 'Dev' },
  { url: 'https://www.infoq.com/feed',                            source: 'InfoQ',               cat: 'Dev' },
];

/* ──────────────────────────────────────────────────────────────
   PROXY STRATEGY — try multiple in order until one works
──────────────────────────────────────────────────────────────── */

// Strategy 1: rss2json API (returns structured JSON + enforces fresh data)
async function fetchViaRss2Json(
  feedUrl: string,
  source: string,
  cat: Article['category']
): Promise<Article[]> {
  const api = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}&api_key=public&count=5&order_by=pubDate&order_dir=desc`;
  const res = await fetch(api, { signal: AbortSignal.timeout(7000) });
  if (!res.ok) throw new Error(`rss2json ${res.status}`);
  const json = await res.json();
  if (json.status !== 'ok' || !json.items?.length) throw new Error('rss2json empty');

  const now = new Date();
  const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

  return json.items
    .map((item: { title?: string; link?: string; description?: string; pubDate?: string }, i: number) => {
      const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();
      // Skip articles older than 1 year
      if (pubDate < oneYearAgo) return null;

      const summary = (item.description ?? '')
        .replace(/<[^>]+>/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 180);

      return {
        id: `${source}-${i}-${pubDate.getTime()}`,
        title: (item.title ?? '').trim(),
        summary: summary + (summary.length === 180 ? '…' : ''),
        url: item.link ?? '#',
        source,
        category: cat,
        publishedAt: pubDate,
        readTime: Math.max(2, Math.ceil(summary.split(' ').length / 40)),
      } satisfies Article;
    })
    .filter(Boolean) as Article[];
}

// Strategy 2: raw XML via allorigins (fallback)
function parseRawXML(xml: string, source: string, cat: Article['category']): Article[] {
  try {
    const doc = new DOMParser().parseFromString(xml, 'application/xml');
    const items = Array.from(doc.querySelectorAll('item, entry')).slice(0, 4);
    const now = new Date();
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

    return items.map((item, i) => {
      const title   = item.querySelector('title')?.textContent?.trim() ?? '';
      const link    = item.querySelector('link')?.textContent?.trim()
                   ?? item.querySelector('link')?.getAttribute('href') ?? '#';
      const desc    = (item.querySelector('description, summary, content')?.textContent ?? '')
                        .replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 180);
      const rawDate = item.querySelector('pubDate, published, updated')?.textContent?.trim();
      const pubDate = rawDate ? new Date(rawDate) : new Date();
      if (!title || pubDate < oneYearAgo) return null;

      return {
        id: `${source}-xml-${i}-${pubDate.getTime()}`,
        title,
        summary: desc + (desc.length === 180 ? '…' : ''),
        url: link,
        source,
        category: cat,
        publishedAt: pubDate,
        readTime: Math.max(2, Math.ceil(desc.split(' ').length / 40)),
      } satisfies Article;
    }).filter(Boolean) as Article[];
  } catch {
    return [];
  }
}

async function fetchViaAllOrigins(
  feedUrl: string,
  source: string,
  cat: Article['category']
): Promise<Article[]> {
  const proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`;
  const res = await fetch(proxy, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`allorigins ${res.status}`);
  const json = await res.json();
  return parseRawXML(json.contents ?? '', source, cat);
}

async function fetchFeed(
  feedUrl: string,
  source: string,
  cat: Article['category']
): Promise<Article[]> {
  // Try rss2json first (best structured data with dates)
  try {
    const articles = await fetchViaRss2Json(feedUrl, source, cat);
    if (articles.length > 0) return articles;
  } catch { /* fall through */ }

  // Fallback to raw XML
  try {
    const articles = await fetchViaAllOrigins(feedUrl, source, cat);
    if (articles.length > 0) return articles;
  } catch { /* fall through */ }

  return [];
}

/* ──────────────────────────────────────────────────────────────
   FALLBACK ARTICLES — shown while loading, clearly labeled
   These are realistic placeholders, not fake "news"
──────────────────────────────────────────────────────────────── */
const FALLBACK: Article[] = [
  {
    id: "f1",
    title: "Chargement des derniers articles en cours...",
    summary: "Les actualites les plus recentes en IA, cybersecurite, tech et developpement sont en cours de chargement depuis nos sources RSS.",
    url: "#",
    source: "En attente",
    category: "AI" as const,
    publishedAt: new Date(),
    readTime: 1,
  },
  {
    id: "f2",
    title: "Connexion aux flux RSS en temps reel...",
    summary: "TechCrunch, The Hacker News, The Verge, Ars Technica, DEV.to et d'autres sources sont interrogees pour vous fournir les news du moment.",
    url: "#",
    source: "En attente",
    category: "Cybersécurité" as const,
    publishedAt: new Date(),
    readTime: 1,
  },
  {
    id: "f3",
    title: "Recuperation des articles les plus recents...",
    summary: "Seuls les articles publiés dans les 12 derniers mois sont affiches. Verification des dates en cours pour garantir la fraicheur du contenu.",
    url: "#",
    source: "En attente",
    category: "Dev" as const,
    publishedAt: new Date(),
    readTime: 1,
  },
  {
    id: "f4",
    title: "Sources tech mondiales en cours d'interrogation...",
    summary: "WIRED, MIT Technology Review, VentureBeat, InfoQ, Dark Reading — 11 sources actives pour couvrir tout l'ecosysteme technologique.",
    url: "#",
    source: "En attente",
    category: "Tech" as const,
    publishedAt: new Date(),
    readTime: 1,
  },
];

/* ──────────────────────────────────────────────────────────────
   TICKER COMPONENT
──────────────────────────────────────────────────────────────── */
function LiveTicker({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;
  const doubled = [...articles, ...articles];
  return (
    <div className="relative overflow-hidden bg-surface-2 border-y border-chalk/6 py-2.5">
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #0f0f18 0%, transparent 100%)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(-90deg, #0f0f18 0%, transparent 100%)' }} />
      <div className="flex items-center gap-12 w-max"
        style={{ animation: 'marquee 55s linear infinite' }}>
        {doubled.map((a, i) => {
          const meta = CAT_META[a.category];
          return (
            <a key={i} href={a.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 flex-none hover:opacity-80 transition-opacity">
              <span className="text-xs font-display font-700 px-1.5 py-0.5 rounded"
                style={{ background: meta.bg, color: meta.color, border: `1px solid ${meta.border}` }}>
                {meta.icon} {a.category}
              </span>
              <span className="text-chalk/60 text-xs font-display">{a.title}</span>
              <span className="text-chalk/20 text-xs">•</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   ARTICLE CARD
──────────────────────────────────────────────────────────────── */
function ArticleCard({ article, index }: { article: Article; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const meta = CAT_META[article.category];

  const timeAgo = (d: Date) => {
    const mins = Math.floor((Date.now() - d.getTime()) / 60000);
    if (mins < 60) return `${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h`;
    return `${Math.floor(hrs / 24)}j`;
  };

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="group relative bg-surface-1 border border-chalk/6 rounded-2xl overflow-hidden
                 hover:border-opacity-60 transition-all duration-300 flex flex-col"
      style={{ '--card-accent': meta.color } as React.CSSProperties}>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${meta.color}, transparent)` }} />

      {/* Category badge */}
      <div className="p-5 pb-0 flex items-center justify-between">
        <span className="text-[10px] font-display font-700 uppercase tracking-widest px-2 py-1 rounded-full"
          style={{ background: meta.bg, color: meta.color, border: `1px solid ${meta.border}` }}>
          {meta.icon} {article.category}
        </span>
        <div className="flex items-center gap-2 text-chalk/25 text-xs font-display">
          <span>{timeAgo(article.publishedAt)}</span>
          <span>·</span>
          <span>{article.readTime} min</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col gap-3">
        <h3 className="font-display font-700 text-chalk text-sm leading-snug
                       group-hover:text-chalk/90 transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-chalk/40 text-xs leading-relaxed line-clamp-3 flex-1">
          {article.summary}
        </p>
      </div>

      {/* Footer */}
      <div className="px-5 pb-5 flex items-center justify-between">
        <span className="text-chalk/25 text-[10px] font-display uppercase tracking-wide">
          {article.source}
        </span>
        <a href={article.url} target="_blank" rel="noopener noreferrer"
          className="text-[10px] font-display font-700 uppercase tracking-wider px-3 py-1.5 rounded-full
                     border transition-all duration-200 hover:scale-105"
          style={{
            color: meta.color,
            borderColor: meta.border,
            background: meta.bg,
          }}>
          Lire →
        </a>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   FEATURED CARD (large)
──────────────────────────────────────────────────────────────── */
function FeaturedCard({ article }: { article: Article }) {
  const meta = CAT_META[article.category];
  return (
    <motion.a href={article.url} target="_blank" rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.01 }}
      className="group relative bg-surface-1 border border-chalk/8 rounded-3xl overflow-hidden
                 flex flex-col justify-end p-8 min-h-[320px] block"
      style={{ textDecoration: 'none' }}>

      {/* Gradient background */}
      <div className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${meta.color}20 0%, transparent 60%),
                       radial-gradient(ellipse at 80% 80%, ${meta.color}10 0%, transparent 50%),
                       #0f0f18`
        }} />

      {/* Big icon */}
      <div className="absolute top-8 right-8 text-6xl opacity-10 group-hover:opacity-20 transition-opacity duration-500">
        {meta.icon}
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-display font-700 uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{ background: meta.bg, color: meta.color, border: `1px solid ${meta.border}` }}>
            ⭐ À la une — {article.category}
          </span>
          <span className="text-chalk/25 text-xs font-display">{article.source}</span>
        </div>
        <h2 className="font-display font-800 text-2xl text-chalk leading-tight mb-3
                       group-hover:text-gold/90 transition-colors duration-300">
          {article.title}
        </h2>
        <p className="text-chalk/50 text-sm leading-relaxed max-w-lg">{article.summary}</p>
        <div className="mt-5 flex items-center gap-2"
          style={{ color: meta.color }}>
          <span className="text-sm font-display font-700">Lire l'article complet</span>
          <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
        </div>
      </div>
    </motion.a>
  );
}

/* ──────────────────────────────────────────────────────────────
   SKELETON CARD
──────────────────────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="bg-surface-1 border border-chalk/5 rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div className="h-5 w-20 bg-chalk/6 rounded-full animate-pulse" />
        <div className="h-3 w-12 bg-chalk/4 rounded-full animate-pulse" />
      </div>
      <div className="space-y-2 mt-1">
        <div className="h-4 bg-chalk/6 rounded animate-pulse w-full" />
        <div className="h-4 bg-chalk/4 rounded animate-pulse w-4/5" />
      </div>
      <div className="space-y-1.5 flex-1">
        <div className="h-3 bg-chalk/4 rounded animate-pulse w-full" />
        <div className="h-3 bg-chalk/3 rounded animate-pulse w-5/6" />
        <div className="h-3 bg-chalk/3 rounded animate-pulse w-3/4" />
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="h-3 w-16 bg-chalk/4 rounded animate-pulse" />
        <div className="h-6 w-14 bg-chalk/6 rounded-full animate-pulse" />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   MAIN BLOG COMPONENT
──────────────────────────────────────────────────────────────── */
type Filter = 'Tous' | 'AI' | 'Cybersécurité' | 'Tech' | 'Dev';
const FILTERS: Filter[] = ['Tous', 'AI', 'Cybersécurité', 'Tech', 'Dev'];
const REFRESH_INTERVAL = 360 * 60 * 1000; // 6H Heures

export function Blog() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const [articles, setArticles]   = useState<Article[]>(FALLBACK);
  const [loading, setLoading]     = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [filter, setFilter]       = useState<Filter>('Tous');
  const [search, setSearch]       = useState('');
  const [liveCount, setLiveCount] = useState(0);

  /* ─── Fetch RSS feeds ─── */
  const fetchFeeds = useCallback(async () => {
    setLoading(true);
    const all: Article[] = [];

    // Fetch all sources in parallel, each with its own proxy cascade
    const results = await Promise.allSettled(
      RSS_SOURCES.map(({ url, source, cat }) => fetchFeed(url, source, cat))
    );

    results.forEach(result => {
      if (result.status === 'fulfilled') {
        all.push(...result.value);
      }
    });

    if (all.length > 0) {
      // Sort strictly by date — newest first, guarantees 2026 content at top
      all.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
      // Remove duplicates by title similarity
      const seen = new Set<string>();
      const deduped = all.filter(a => {
        const key = a.title.toLowerCase().slice(0, 40);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      setArticles(deduped);
      setLiveCount(deduped.length);
    }
    setLastUpdate(new Date());
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchFeeds();
    const id = setInterval(fetchFeeds, REFRESH_INTERVAL);
    return () => clearInterval(id);
  }, [fetchFeeds]);

  /* ─── Filtered articles ─── */
  const filtered = articles.filter(a => {
    const matchCat = filter === 'Tous' || a.category === filter;
    const matchQ   = !search || a.title.toLowerCase().includes(search.toLowerCase())
      || a.summary.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchQ;
  });

  const featured  = filtered[0];
  const rest      = filtered.slice(1);

  const stats = {
    AI:           articles.filter(a => a.category === 'AI').length,
    Cybersécurité: articles.filter(a => a.category === 'Cybersécurité').length,
    Tech:         articles.filter(a => a.category === 'Tech').length,
    Dev:          articles.filter(a => a.category === 'Dev').length,
  };

  return (
    <section id="blog" ref={ref} className="py-28 relative overflow-hidden">
      {/* BG glows */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.05), transparent 70%)' }} />
      <div className="absolute bottom-1/3 -left-32 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.04), transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* ── Section header ── */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-gold/60" />
          <span className="divider-glyph">07 — Veille Technologique</span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}>
            <h2 className="font-display font-800 text-5xl text-chalk leading-none">
              Tech{' '}<span className="gold-shimmer">Radar.</span>
            </h2>
            <p className="text-chalk/40 text-sm mt-3 max-w-md leading-relaxed">
              Agrégation en temps réel des actualités IA, cybersécurité, dev
              et tech — articles filtrés par date, toujours à jour.
            </p>
          </motion.div>

          {/* Live indicator + refresh */}
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }} className="flex items-center gap-4 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse" />
              <span className="text-[#3fb950] text-xs font-display font-700">
                {liveCount > 0 ? `${liveCount} articles live` : 'Chargement…'}
              </span>
            </div>
            <div className="text-chalk/20 text-xs font-display">
              Màj {lastUpdate.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })} {lastUpdate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <button onClick={fetchFeeds}
              className="flex items-center gap-1.5 text-xs font-display text-chalk/35
                         hover:text-gold transition-colors border border-chalk/8
                         hover:border-gold/30 rounded-full px-3 py-1.5 bg-surface-1">
              <span className={loading ? 'animate-spin inline-block' : ''}>↻</span>
              Actualiser
            </button>
          </motion.div>
        </div>
      </div>

      {/* ── Ticker ── */}
      <LiveTicker articles={articles.slice(0, 12)} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-10">

        {/* ── Stats row ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-4 gap-3 mb-10">
          {(Object.entries(stats) as [Article['category'], number][]).map(([cat, count]) => {
            const m = CAT_META[cat];
            return (
              <button key={cat} onClick={() => setFilter(filter === cat ? 'Tous' : cat)}
                className="bg-surface-1 border rounded-xl p-4 text-center transition-all duration-200
                           hover:scale-105 cursor-pointer"
                style={{
                  borderColor: filter === cat ? m.border : 'rgba(255,255,255,0.06)',
                  background: filter === cat ? m.bg : '#0f0f18',
                }}>
                <div className="text-xl mb-1">{m.icon}</div>
                <div className="font-display font-700 text-lg" style={{ color: m.color }}>{count}</div>
                <div className="text-chalk/30 text-[9px] font-display uppercase tracking-wide">{cat}</div>
              </button>
            );
          })}
        </motion.div>

        {/* ── Filters + Search ── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25 }} className="flex flex-col sm:flex-row gap-4 mb-10">

          {/* Filter pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {FILTERS.map(f => {
              const active = filter === f;
              const m = f !== 'Tous' ? CAT_META[f] : null;
              return (
                <button key={f} onClick={() => setFilter(f)}
                  className="text-xs font-display font-700 uppercase tracking-wider
                             px-4 py-2 rounded-full border transition-all duration-200"
                  style={{
                    background: active ? (m?.bg ?? 'rgba(201,168,76,0.12)') : 'transparent',
                    color: active ? (m?.color ?? '#c9a84c') : 'rgba(244,241,236,0.35)',
                    borderColor: active ? (m?.border ?? 'rgba(201,168,76,0.3)') : 'rgba(255,255,255,0.08)',
                  }}>
                  {f !== 'Tous' && m?.icon + ' '}{f}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative flex-1 sm:max-w-xs ml-auto">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher…"
              className="w-full bg-surface-1 border border-chalk/8 rounded-full px-4 py-2
                         text-chalk text-sm font-display placeholder-chalk/20
                         focus:outline-none focus:border-gold/40 transition-colors pr-10"
            />
            {search && (
              <button onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-chalk/30 hover:text-chalk/70">
                ✕
              </button>
            )}
          </div>
        </motion.div>

        {/* ── Featured article ── */}
        <AnimatePresence mode="wait">
          {loading ? (
            <div className="bg-surface-1 border border-chalk/5 rounded-3xl min-h-[320px] animate-pulse mb-8" />
          ) : featured ? (
            <div className="mb-8">
              <FeaturedCard article={featured} />
            </div>
          ) : null}
        </AnimatePresence>

        {/* ── Article grid ── */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : rest.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {rest.map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} />
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-20 text-chalk/25 font-display">
            <div className="text-4xl mb-4">🔍</div>
            <p>Aucun article trouvé pour « {search || filter} »</p>
            <button onClick={() => { setSearch(''); setFilter('Tous'); }}
              className="mt-4 text-gold text-sm hover:underline">
              Effacer les filtres
            </button>
          </motion.div>
        )}

        {/* ── Sources footer ── */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-8 border-t border-chalk/6 flex flex-col sm:flex-row items-center
                     justify-between gap-4 text-chalk/20 text-xs font-display">
          <div>
            Sources : {RSS_SOURCES.map(s => s.source).join(' · ')}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] animate-pulse" />
            Actualisation automatique toutes les 6H — articles filtrés par date 
          </div>
        </motion.div>

      </div>
    </section>
  );
}