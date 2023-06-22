import { default as NextImage, ImageProps as NextImageProps } from "next/image";
import { useState } from "react";

type ImageProps = Omit<NextImageProps, "onError"> & {
  fallback?: NextImageProps["src"];
};

export function Image({ fallback, src, ...rest }: ImageProps) {
  const [img, setImg] = useState(src);

  const onError = () => {
    if (fallback) {
      setImg(fallback);
    }
  };

  return <NextImage {...rest} src={img} onError={onError} />;
}
