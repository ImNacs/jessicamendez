/**
 * RSS Feed
 * Generates an RSS feed for the blog
 */
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { profile } from '@/lib/utils';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);

  return rss({
    title: `Blog | ${profile.shortName}`,
    description: 'Articulos sobre ESG, regulacion ambiental, IFC Performance Standards, sostenibilidad y gestion ambiental.',
    site: context.site!,
    items: posts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/blog/${post.id}/`,
        categories: [post.data.category, ...post.data.tags],
        author: profile.name,
      })),
    customData: `<language>es-mx</language>
<copyright>Copyright ${new Date().getFullYear()} ${profile.name}</copyright>
<managingEditor>${profile.email} (${profile.name})</managingEditor>
<webMaster>${profile.email} (${profile.name})</webMaster>`,
  });
}
