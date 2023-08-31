import { IconHistory } from '@arco-design/web-react/icon';
import { useState } from 'react';
import { FloatButton } from '@/components/float-button/float-button';
import { DocHistory } from './doc-history/doc-history';

export const HistoryButton = (props: { id: string; componentId: string }) => {
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  return (
    <>
      <FloatButton bottom={84} icon={<IconHistory></IconHistory>} onClick={() => setIsHistoryVisible(true)}>
        文档更新记录
      </FloatButton>

      <DocHistory
        id={props.id}
        componentId={props.componentId}
        visible={isHistoryVisible}
        onCancel={() => setIsHistoryVisible(false)}
        onOk={() => setIsHistoryVisible(false)}
      ></DocHistory>
    </>
  );
};
