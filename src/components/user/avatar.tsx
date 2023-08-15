import Image, { ImageProps } from 'next/image';

export const UserAvatar = (props: Partial<Omit<ImageProps, 'src'>> & { src?: string | null; size?: number }) => {
  const { src, size = 32, ...rest } = props;
  return (
    <Image
      width={size}
      height={size}
      src={src ?? '/logo.png'}
      alt="用户头像"
      style={{ borderRadius: '50%' }}
      {...rest}
    ></Image>
  );
};
