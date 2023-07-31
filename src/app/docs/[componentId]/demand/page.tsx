'use client';

import { useMajorVersionId } from '@/hooks/use-major-version-id';
import { useCreateDemand, useDemands, useUpdateDemand } from '@/services/demand';
import { Editor, Comment } from '@/components';
import { useState } from 'react';
import { Input, Message, Card } from '@arco-design/web-react';

import './page.scss';

export default function Demand({ params }: { params: { componentId: string } }) {
  const styleName = 'demand';

  const [majorVersionId] = useMajorVersionId();
  const componentId = params.componentId;
  const [isAddDemand, setIsAddDemand] = useState(false);
  const { trigger: createDemand, error: createDemandError } = useCreateDemand();
  const { trigger: updateDemand, error: updateDemandError } = useUpdateDemand();

  const {
    data: demands,
    error,
    mutate: updateDemands
  } = useDemands({
    majorVersionId,
    componentId: params.componentId
  });

  console.log('demands', demands);

  if (error) {
    return null;
  }

  const handleCreateDemand = async (content: string) => {
    if (!content) {
      Message.error('请输入需求内容');
      return;
    }
    await createDemand({
      majorVersionId,
      componentId,
      content
    });

    if (createDemandError) {
      return;
    }

    updateDemands();
    Message.success('提交成功');
    return true;
  };

  const handleUpdateDemand = async (id: string, content: string) => {
    if (!content) {
      Message.error('请输入需求内容');
      return;
    }
    await updateDemand({
      id,
      content
    });

    if (updateDemandError) {
      return;
    }

    Message.success('更新成功');
    updateDemands();
    return true;
  };

  return (
    <div className={styleName}>
      {isAddDemand ? (
        <Editor onEditChange={(isEdit) => setIsAddDemand(isEdit)} onSave={handleCreateDemand}></Editor>
      ) : (
        <Input.TextArea rows={3} onFocus={() => setIsAddDemand(true)} placeholder="请填写需求内容"></Input.TextArea>
      )}

      <div className={`${styleName}-list`}>
        {demands?.map((demand) => {
          return (
            <Card key={demand.id} style={{ marginTop: 24 }}>
              <Comment
                username={demand.createdBy.nickname ?? ''}
                content={demand.content}
                updatedAt={demand.updatedAt ?? ''}
                onUpdateContent={(content) => handleUpdateDemand(demand.id, content)}
              >
                {/* xxx */}
              </Comment>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
