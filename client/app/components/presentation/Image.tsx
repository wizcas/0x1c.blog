import { ImgHTMLAttributes } from 'react';

export interface ImageAsset {
  url: string;
  previewUrl?: string;
}

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  asset: ImageAsset;
};

export default function Image({ asset, alt = '', ...rest }: Props) {
  const src = asset.url;
  return <img src={src} alt={alt} {...rest} />;
}
