import './empty.scss';

import Image from 'next/image';

export const Empty = (props: { description?: React.ReactNode; style?: React.CSSProperties }) => {
  const styleName = 'empty';
  const { description, style } = props;

  return (
    <div className={styleName} style={style}>
      <Image src="/empty.png" width={120} height={120} alt="暂无数据"></Image>
      <div className={`${styleName}-description`}>{description ?? '暂无数据'}</div>
    </div>
  );
};
