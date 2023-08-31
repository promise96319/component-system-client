'use client';

import './back-top.scss';
import { BackTop as ArcoBackTop, BackTopProps, IconToTop } from '@/components/arco';
import { FloatButton } from '../float-button/float-button';

export const BackTop = (props: BackTopProps) => {
  return (
    <ArcoBackTop {...props} className="back-top">
      <FloatButton icon={<IconToTop></IconToTop>}></FloatButton>
    </ArcoBackTop>
  );
};
