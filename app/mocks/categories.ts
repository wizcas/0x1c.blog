import { Category } from '~/services/blog/types';

import { generateArticles } from './articles';
import { loremIpsum } from './lorem';

export const CATEGORIES: Category[] = [
  {
    title: 'Coding Career',
    slug: 'coding-career',
    description: loremIpsum(5),
    color: '#13557A',
    coverUrl:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2344&q=80',
    latestArticles: generateArticles(3),
  },
  {
    title: 'Game Making',
    slug: 'game-making',
    description: loremIpsum(5),
    color: '#1C1A17',
    coverUrl:
      'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2338&q=80',
    latestArticles: generateArticles(3),
  },
  {
    title: 'Bits & Pieces',
    slug: 'bits-pieces',
    description: loremIpsum(5),
    color: '#813B3B',
    coverUrl:
      'https://images.unsplash.com/photo-1560088032-d21fe602f4bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    latestArticles: generateArticles(3),
  },
];
