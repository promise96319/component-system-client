import { Button } from '@arco-design/web-react';
import { useState } from 'react';
import { DocHistory } from '@/components/doc-history/doc-history';

export const HistoryButton = (props: { id: string; componentId: string }) => {
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  return (
    <>
      <Button type="text" onClick={() => setIsHistoryVisible(true)}>
        更新记录
      </Button>

      <DocHistory
        id={props.id}
        componentId={props.componentId}
        visible={isHistoryVisible}
        onCancel={() => setIsHistoryVisible(false)}
      ></DocHistory>
    </>
  );
};
