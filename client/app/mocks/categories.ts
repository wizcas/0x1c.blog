import type { Category } from '~/services/blog/models';

import { generateArticles } from './articles';
import { loremIpsum } from './lorem';

export const CATEGORIES: Category[] = [
  {
    title: 'Coding Career',
    id: 'coding-career',
    description: loremIpsum(5),
    themeColor: '#0049B2',
    cover: {
      url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2344&q=80',
    },
    articles: generateArticles(3),
  },
  {
    title: 'Game Making',
    id: 'game-making',
    description: loremIpsum(5),
    themeColor: '#1C1A17',
    cover: {
      url: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2338&q=80',
    },
    articles: generateArticles(3),
  },
  {
    title: 'Bits & Pieces',
    id: 'bits-pieces',
    description: loremIpsum(5),
    themeColor: '#A3293D',
    cover: {
      url: 'https://images.unsplash.com/photo-1560088032-d21fe602f4bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    },
    articles: generateArticles(3),
  },
];
