import classNames from 'classnames';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'all' | 'glyph' | 'text';
  className?: string;
}

const SIZE_CLASS = {
  sm: 'h-4 gap-2',
  md: 'h-8 gap-4',
  lg: 'h-12 gap-4',
};

export default function Logo({
  size = 'md',
  variant = 'all',
  className,
}: Props) {
  const showGlyph = variant === 'glyph' || variant === 'all';
  const showText = variant === 'text' || variant === 'all';
  return (
    <div
      className={classNames(
        'flex flex-row items-stretch',
        SIZE_CLASS[size],
        className
      )}
    >
      {showGlyph && <img src="/images/logo-light.svg" alt="Site logo" />}
      {showText && (
        <img
          src="/images/logo-text-light.svg"
          alt="0x1C.dev"
          className="py-1"
        />
      )}
    </div>
  );
}
