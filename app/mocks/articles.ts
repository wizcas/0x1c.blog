import dayjs from 'dayjs';

import type { Article } from '~/services/blog/types';

import { loremIpsum } from './lorem';

export const ARTICLE: Article = {
  title: 'Mock Article Is Useful',
  slug: 'mock-article',
  datetime: dayjs().toISOString(),
  excerpt: loremIpsum(5),
  content: loremIpsum(20),
};

function mockArticle(id: string) {
  return {
    title: 'Mock Article Is Useful',
    slug: `mock-article-${id}`,
    datetime: dayjs().toISOString(),
    excerpt: loremIpsum(5),
    content: loremIpsum(20),
  };
}

export function generateArticles(count: number): Article[] {
  return new Array(count).fill(0).map((_, i) => {
    const a = mockArticle(i.toString());
    return a;
  });
}
