export function getServerUrl(url: string | null | undefined) {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('//')) return url;

  const base = process.env.SERVER_BASE;
  if (!url.startsWith('/')) {
    url = `/${url}`;
  }
  return `${base}${url}`;
}
