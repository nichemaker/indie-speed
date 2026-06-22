import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  return rss({
    title: 'IndieSpeedRun',
    description: 'Indie game coverage and speedrun world records. Scene-aware, no fabricated claims.',
    site: context.site!,
    items: [],
    customData: `<language>en-us</language>`,
  });
}
