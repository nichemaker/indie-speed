import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://www.indiespeedrun.com';

// Static pages: verified against src/pages/ directory.
// 404.astro and rss.xml.ts are excluded — not indexable content.
const staticPaths: { path: string; lastmod: string | null }[] = [
  { path: '/', lastmod: null },
  { path: '/about/', lastmod: null },
  { path: '/methodology/', lastmod: null },
  { path: '/jam-archive/', lastmod: null },
  { path: '/speedrun-timer/', lastmod: null },
  { path: '/speedrun-game/', lastmod: null },
  { path: '/speedruns/', lastmod: null },
  { path: '/speedruns/what-is-speedrunning/', lastmod: null },
];

// Collection 'speedrun-records' entry IDs (filenames, e.g. 'minecraft-wr')
// do NOT match URL slugs. Pages are static .astro files. Map explicitly so
// every URL resolves to a real built path. Extend this map as CC-4 pages land.
const SLUG_MAP: Record<string, string> = {
  'minecraft-wr': '/speedruns/minecraft-speedrun-world-record/',
  'silksong-speedrun': '/speedruns/silksong-speedrun/',
};

export const GET: APIRoute = async () => {
  const records = await getCollection('speedrun-records');

  const dynamic = records
    .filter((e) => e.data.headline.verified === true && SLUG_MAP[e.id])
    .map((e) => ({
      path: SLUG_MAP[e.id],
      lastmod: e.data.updatedAt ?? null,
    }));

  const entries = [...staticPaths, ...dynamic];

  const urls = entries
    .map(({ path, lastmod }) => {
      const loc = new URL(path, SITE).href;
      const mod = lastmod
        ? `\n    <lastmod>${new Date(lastmod).toISOString()}</lastmod>`
        : '';
      return `  <url>\n    <loc>${loc}</loc>${mod}\n  </url>`;
    })
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
  );
};
