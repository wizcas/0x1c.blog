import escapeRegExp from 'lodash/fp/escapeRegExp';

export const REPLACE_ORIGIN = process.env.DO_SPACES_ORIGIN;
export const REPLACE_CDN = process.env.DO_SPACES_CDN;
export const ORIGIN_REGEXP = new RegExp(
  escapeRegExp(REPLACE_ORIGIN || ''),
  'g'
);

export function getServerUrl(url: string | null | undefined) {
  if (!url) return '';
  if (REPLACE_ORIGIN && REPLACE_CDN && url.startsWith(REPLACE_ORIGIN)) {
    return url.replace(REPLACE_ORIGIN, REPLACE_CDN);
  }
  if (url.startsWith('http') || url.startsWith('//')) return url;

  const base = process.env.SERVER_BASE_URL;
  if (!url.startsWith('/')) {
    url = `/${url}`;
  }
  return `${base}${url}`;
}

export function replaceByCdnFullText(text: string) {
  if (!text) return text;
  if (!REPLACE_ORIGIN || !REPLACE_CDN) return text;

  const t0 = Date.now();
  const newText = text.replace(ORIGIN_REGEXP, REPLACE_CDN);
  // eslint-disable-next-line no-console
  console.log('<Full text replace to CDN>', {
    length: text.length,
    elapsed: Date.now() - t0,
  });
  return newText;
}
