import copy from 'copy-to-clipboard';
import { KeyboardEvent } from 'react';

interface Props {
  id: string;
}

export function copyAnchorLink(anchorId?: string) {
  function getLink(id: string): string {
    const url = new URL(window.location.href);
    if (id) {
      url.hash = id;
    }
    return url.toString();
  }
  copy(getLink(anchorId || ''));
}

export default function TocAnchor({ id }: Props) {
  function handleCopy() {
    copyAnchorLink(id);
  }
  function handleKeyboard(e: KeyboardEvent<HTMLSpanElement>) {
    if (e.key === 'Enter' || e.key === 'Return') {
      handleCopy();
    }
  }
  return (
    <span
      id={id}
      tabIndex={0}
      role="button"
      className="anchor"
      data-toc-anchor
      onClick={handleCopy}
      onKeyDown={handleKeyboard}
    >
      #
    </span>
  );
}
