import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Blog Collection - Astro 5 Content Layer API
 *
 * Posts are stored as MDX files in src/content/blog/
 * Schema enforces SEO best practices (title length, description, etc.)
 */
const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: ({ image }) => z.object({
    // SEO-critical fields (enforced lengths)
    title: z.string().max(60, 'El título debe tener máximo 60 caracteres para SEO'),
    description: z.string()
      .min(120, 'La descripción debe tener al menos 120 caracteres')
      .max(160, 'La descripción debe tener máximo 160 caracteres para SEO'),

    // Dates
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),

    // Taxonomy
    category: z.enum([
      'ESG',
      'Regulacion-Ambiental',
      'IFC',
      'Sostenibilidad',
      'Estudios-Ambientales'
    ]),
    tags: z.array(z.string()).default([]),

    // Media
    heroImage: image().optional(),
    heroImageAlt: z.string().optional(),

    // Content control
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),

    // SEO extras
    canonicalUrl: z.string().url().optional(),
    noindex: z.boolean().default(false),
  }),
});

export const collections = {
  blog: blogCollection
};
