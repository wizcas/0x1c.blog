import dayjs from 'dayjs';

import type { Article } from '~/services/blog/types';

import { loremIpsum } from './lorem';

function mockArticle(id: string) {
  return {
    title: 'Mock Article Is Useful',
    slug: `mock-article-${id}`,
    datetime: dayjs().toISOString(),
    excerpt: loremIpsum(5),
    content: loremIpsum(20),
    topic: {
      title: 'Pop my eyeballs',
      slug: 'pop-eyes',
      category: {
        title: 'Coding Career',
        slug: 'coding-career',
        color: '#0049B2',
      },
    },
    tags: [
      { label: 'eye', slug: 'eye' },
      { label: 'vision', slug: 'vision' },
      { label: 'medical emergency', slug: 'med-emergency' },
    ],
  };
}

export function generateArticles(count: number): Article[] {
  return new Array(count).fill(0).map((_, i) => {
    const a = mockArticle(i.toString());
    return a;
  });
}
