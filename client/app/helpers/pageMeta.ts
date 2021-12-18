import { HtmlMetaDescriptor } from 'remix';

const SITE_TITLE = '0x1C.dev';
const DEFAULT_DESCRIPTION = '陈小一 Wizcas Chen 的个人博客、技术文章、作品展示';

export function genMeta({
  title,
  description,
}: {
  title?: string;
  description?: string;
} = {}): HtmlMetaDescriptor {
  return {
    title: [title, SITE_TITLE].filter(Boolean).join(' - '),
    description: description || DEFAULT_DESCRIPTION,
  };
}
