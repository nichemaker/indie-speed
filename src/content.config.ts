import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const speedrunRecords = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/speedrun-records' }),
  schema: z.object({
    game: z.string(),
    category: z.string(),
    runner: z.string(),
    time: z.string(),
    date: z.string(),
    sourceUrl: z.string().url(),
    platform: z.string().optional(),
    notes: z.string().optional(),
    updatedAt: z.string(),
  }),
});

const indieGames = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/indie-games' }),
  schema: z.object({
    title: z.string(),
    developer: z.string(),
    releaseYear: z.number(),
    platforms: z.array(z.string()),
    speedrunFriendly: z.boolean().optional(),
    steamUrl: z.string().url().optional(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

const jamEntries = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/jam-entries' }),
  schema: z.object({
    jamYear: z.number(),
    teamName: z.string(),
    gameName: z.string(),
    description: z.string(),
    url: z.string().url().optional(),
    awards: z.array(z.string()).optional(),
  }),
});

export const collections = {
  'speedrun-records': speedrunRecords,
  'indie-games': indieGames,
  'jam-entries': jamEntries,
};
