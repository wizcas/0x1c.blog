import dayjs from 'dayjs';

import type { Article } from '~/services/blog/types';

import { loremIpsum } from './lorem';

export function mockArticle(id: string) {
  const hasCover = Math.random() > 0.3;
  return {
    title: 'Mock Article Is Useful',
    slug: `mock-article-${id}`,
    datetime: dayjs().toISOString(),
    excerpt: loremIpsum(5),
    content: loremIpsum(20),
    category: { slug: 'coding-career', title: 'Coding Career' },
    topic: {
      title: 'Pop my eyeballs',
      slug: 'pop-eyes',
    },
    tags: [
      { label: 'eye', slug: 'eye' },
      { label: 'vision', slug: 'vision' },
      { label: 'medical emergency', slug: 'med-emergency' },
    ],
    cover: hasCover ? `https://picsum.photos/600/400` : undefined,
  } as Article;
}

export function generateArticles(count: number): Article[] {
  return new Array(count).fill(0).map((_, i) => {
    const a = mockArticle(i.toString());
    return a;
  });
}
