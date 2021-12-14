import { useState, useEffect, RefObject, DependencyList } from 'react';

import type { ReadingData } from '~/components/articles/post/ReadingContext';

interface HeadingTop {
  id: string;
  top: number;
}

interface UseReadingDataOptions<TElement> {
  /** The ref to the root elements to be monitored */
  ref: RefObject<TElement>;
  /** Default reading data */
  defaultValue?: ReadingData;
  /**
   * By what ratio of the viewport height is passed for a
   * heading is considered being read.
   *
   * For example,
   * - `0` is when a heading is just entered the viewport from bottom
   * - `0.5` is when a heading reaches half of the viewport
   * - `1` is when a heading is at the top of the viewport
   *
   * Default value is `0`.
   */
  headingActiveRatio?: number;
}

export default function useReadingData<TElement extends HTMLElement>(
  opts: UseReadingDataOptions<TElement>,
  deps?: DependencyList
) {
  const { ref, defaultValue = {}, headingActiveRatio = 0 } = opts;
  const [readingData, setReadingData] = useState<ReadingData>(defaultValue);
  const [headingTops, setHeadingTops] = useState<HeadingTop[]>([]);

  useEffect(() => {
    if (!ref.current) return;
    const root = ref.current;
    const tops: HeadingTop[] = [];
    root.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((value) => {
      const el = value as HTMLElement;
      const anchor = el.querySelector('a') as HTMLAnchorElement;
      tops.push({ id: anchor.id, top: el.offsetTop });
    });
    setHeadingTops(tops);
  }, [...(deps ?? [])]);

  // detect currently reading heading Id
  useEffect(() => {
    function fn() {
      const ratio = headingActiveRatio ?? 0;
      const pageViewportHeight =
        window.innerHeight - 96; /* minus site header's height */
      const threshold = pageViewportHeight * (1 - ratio);
      const mark = window.scrollY + threshold;

      function findActiveHeadingId(): string {
        for (let i = headingTops.length - 1; i >= 0; i--) {
          const headingTop = headingTops[i];
          if (headingTop.top <= mark) {
            return headingTop.id;
          }
        }
        return headingTops[0]?.id;
      }

      setReadingData({ activeHeadingId: findActiveHeadingId() });
    }
    window.addEventListener('scroll', fn);
    fn();
    return () => {
      window.removeEventListener('scroll', fn);
    };
  }, [headingTops]);

  return readingData;
}
