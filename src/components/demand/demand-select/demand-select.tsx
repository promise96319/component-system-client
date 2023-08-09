import { Select, SelectProps } from '@arco-design/web-react';
import { Demand } from '@/services/common';

export const DemandSelect = (props: SelectProps & { demands: Demand[]; onChange?: (ids: string[]) => void }) => {
  return (
    <Select
      mode="multiple"
      filterOption={(inputValue, option) => {
        return (
          option.props.extra.content.indexOf(inputValue) > -1 || `#${option.props.extra.no}`.indexOf(inputValue) > -1
        );
      }}
      {...props}
      onChange={props.onChange}
    >
      {props.demands?.map((demand) => (
        <Select.Option key={demand.id} value={demand.id} extra={demand}>
          （#{demand.no}）{demand.content}
        </Select.Option>
      ))}
    </Select>
  );
};
