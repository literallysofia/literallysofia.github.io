import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const heroCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/hero' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    slogan: z.string(),
  }),
});

const aboutCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/about' }),
  schema: z.object({
    title: z.string(),
    education: z.array(
      z.object({
        date: z.string(),
        degree: z.string(),
        school: z.string(),
        web: z.string(),
        details: z.string().optional(),
        link: z.string().optional(),
      })
    ),
    languages: z.array(
      z.object({
        language: z.string(),
        icon: z.string(),
        level: z.string(),
      })
    ),
  }),
});

const experienceCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/experience' }),
  schema: z.object({
    title: z.string(),
    jobs: z.array(
      z.object({
        date: z.string(),
        title: z.string(),
        company: z.string().optional(),
        web: z.string().optional(),
        description: z.string().optional(),
        tasks: z.array(z.string()).optional(),
      })
    ),
  }),
});

const extraCurricularCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/extra-curricular' }),
  schema: z.object({
    title: z.string(),
    jobs: z.array(
      z.object({
        date: z.string(),
        title: z.string(),
        company: z.string(),
        web: z.string(),
        tasks: z.array(z.string()),
      })
    ),
  }),
});

const portfolioCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/portfolio' }),
  schema: z.object({
    title: z.string(),
    projects: z.array(
      z.object({
        title: z.string(),
        abstract: z.string(),
        github: z.string().optional(),
        website: z.string().optional(),
        behance: z.string().optional(),
        keywords: z.array(z.string()),
      })
    ),
  }),
});

export const collections = {
  hero: heroCollection,
  about: aboutCollection,
  experience: experienceCollection,
  'extra-curricular': extraCurricularCollection,
  portfolio: portfolioCollection,
};
