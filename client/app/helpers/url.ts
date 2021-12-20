export function getServerUrl(url: string | null | undefined) {
  if (!url) return '';
  const storageOrigin = process.env.DO_SPACES_ORIGIN;
  const storageCdn = process.env.DO_SPACES_CDN;
  if (storageOrigin && storageCdn && url.startsWith(storageOrigin)) {
    return url.replace(storageOrigin, storageCdn);
  }
  if (url.startsWith('http') || url.startsWith('//')) return url;

  const base = process.env.SERVER_BASE;
  if (!url.startsWith('/')) {
    url = `/${url}`;
  }
  return `${base}${url}`;
}
