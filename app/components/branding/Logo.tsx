import classNames from 'classnames';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'all' | 'glyph' | 'text';
}

const SIZE_HEIGHTS = {
  sm: 'h-4',
  md: 'h-8',
  lg: 'h-12',
};

export default function Logo({ size = 'md', variant = 'all' }: Props) {
  const showGlyph = variant === 'glyph' || variant === 'all';
  const showText = variant === 'text' || variant === 'all';
  const sizeStyle = SIZE_HEIGHTS[size];
  return (
    <div className={classNames('flex flex-row items-center gap-4', sizeStyle)}>
      {showGlyph && <img src="/images/logo-light.svg" alt="Site logo" />}
      {showText && <img src="/images/logo-text-light.svg" alt="0x1C.dev" />}
    </div>
  );
}
