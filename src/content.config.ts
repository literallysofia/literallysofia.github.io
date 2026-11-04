import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const heroCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/hero' }),
  schema: z.object({
    eyebrow: z.string(),
    title: z.string(),
    accent: z.string(),
    description: z.string(),
  }),
});

const aboutCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/about' }),
  schema: z.object({
    title: z.string(),
    likes: z.string(),
    currently: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
        url: z.string().optional(),
      })
    ),
    education: z.array(
      z.object({
        date: z.string(),
        degree: z.string(),
        web: z.string(),
        /** The thesis, linked beside the degree */
        link: z.string().optional(),
      })
    ),
    languages: z.array(
      z.object({
        language: z.string(),
        level: z.string(),
      })
    ),
  }),
});

const experienceCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/experience' }),
  schema: z.object({
    jobs: z.array(
      z.object({
        title: z.string(),
        company: z.string(),
        /** One impact line on the about page */
        highlight: z.string(),
        /** Short role + years label for the home experience rows */
        summary: z.string(),
      })
    ),
  }),
});

const portfolioCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/portfolio' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      projects: z.array(
        z.object({
          slug: z.string(),
          name: z.string(),
          years: z.string(),
          role: z.string(),
          featured: z.boolean().default(false),
          icon: image().optional(),
          link: z.object({ label: z.string(), url: z.string() }),
          /** A second link beside the first (e.g. the thesis) */
          extraLink: z.object({ label: z.string(), url: z.string() }).optional(),
          /** Card colours, taken from the app's own look */
          card: z.object({
            bg: z.string(),
            fg: z.string(),
            bar: z.string(),
            accent: z.string(),
            border: z.boolean().default(false),
          }),
          cardTitle: z.string(),
          cardAccent: z.string(),
          cardSubtitle: z.string(),
          cardMedia: image().optional(),
          highlights: z.array(
            z.object({
              eyebrow: z.string(),
              title: z.string(),
              accent: z.string(),
              media: image().optional(),
              video: z.string().optional(),
              /** Still shown before the video plays (and with reduced motion) */
              poster: z.string().optional(),
              /** Type-only card: the title fills the card, with this small line at the bottom */
              note: z.string().optional(),
            })
          ),
          /** Real-world footage shown wide under the cards (paths in public/) */
          clip: z.object({ src: z.string(), poster: z.string(), caption: z.string() }).optional(),
        })
      ),
    }),
});

export const collections = {
  hero: heroCollection,
  about: aboutCollection,
  experience: experienceCollection,
  portfolio: portfolioCollection,
};
