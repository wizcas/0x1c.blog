import dayjs from 'dayjs';

import type { Article } from '~/services/blog/models';

import { loremIpsum } from './lorem';

export function mockArticle(id: string) {
  const hasCover = Math.random() > 0.3;
  return {
    title: 'Mock Article Is Useful',
    id: `mock-article-${id}`,
    datetime: dayjs().toISOString(),
    excerpt: loremIpsum(5),
    content: loremIpsum(20),
    category: { id: 'coding-career', title: 'Coding Career' },
    topic: {
      title: 'Pop my eyeballs',
      id: 'pop-eyes',
    },
    tags: [
      { label: 'eye', id: 'eye' },
      { label: 'vision', id: 'vision' },
      { label: 'medical emergency', id: 'med-emergency' },
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
