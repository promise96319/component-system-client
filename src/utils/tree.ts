import { cloneDeep } from 'lodash-es';

export interface FieldNames {
  label: string;
  value: string;
  children?: string;
  [propName: string]: any;
}

/**
 * 将树形数据标准化
 * @param data 树形数据
 * @param filedNames 数据的关键字段名称
 * @returns 标准的树形数据
 */
export const normalizeTreeData = (data: any[] = [], filedNames?: FieldNames): FieldNames[] => {
  if (!filedNames) {
    return data;
  }

  const traverse = (data: any[]) => {
    return cloneDeep(data).map((item) => {
      item.label = item[filedNames.label ?? 'label'];
      item.value = item[filedNames.value ?? 'value'];
      if (item[filedNames.children ?? 'children']) {
        item.children = traverse(item[filedNames.children ?? 'children']);
      }
      return item;
    });
  };

  return traverse(cloneDeep(data));
};

export const getTreeNodeCount = (data: any[], fieldNames: any) => {
  let count = 0;
  const traverse = (data: any[]) => {
    data.forEach((item) => {
      count++;
      if (item[fieldNames.children ?? 'children']) {
        traverse(item[fieldNames.children ?? 'children']);
      }
    });
  };
  traverse(data);
  return count;
};
