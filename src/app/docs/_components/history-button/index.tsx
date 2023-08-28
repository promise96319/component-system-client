import { Button, Tooltip } from '@arco-design/web-react';
import { IconHistory } from '@arco-design/web-react/icon';
import { useState } from 'react';
import { DocHistory } from '@/components/doc-history/doc-history';

export const HistoryButton = (props: { id: string; componentId: string }) => {
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  return (
    <>
      <Tooltip content="文档更新记录">
        <Button shape="round" icon={<IconHistory></IconHistory>} onClick={() => setIsHistoryVisible(true)}></Button>
      </Tooltip>

      <DocHistory
        id={props.id}
        componentId={props.componentId}
        visible={isHistoryVisible}
        onCancel={() => setIsHistoryVisible(false)}
      ></DocHistory>
    </>
  );
};
