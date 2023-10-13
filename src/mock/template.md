# Button

按钮用于开始一个即时操作。

## 代码演示

- level1
- level1
  - level2
  - level2
    - level3
    - level3

> 引用代码休息下：： sd

引用：`adasdddddd`

加粗：**...asdadads**

### 按钮类型

按钮有五种类型：主按钮（primary）、线框按钮（default）、危险按钮（danger）、虚线按钮（dashed）、文本按钮(text)。默认为主按钮（primary）。

```
import { Button, ButtonGroup } from '@qt/design';
import React from 'react';
export default class extends React.Component {
  render() {
    return (
      <ButtonGroup wrap={true} size={['small', 'small']}>
        <Button type="primary">Primary Button</Button>
        <Button type="default">Default Button</Button>
        <Button type="danger">Danger Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="text">Text Button</Button>
      </ButtonGroup>
    );
  }
}
```

### 图标按钮

通过 icon 属性可以设置按钮的前置图标

```
import { Button, ButtonGroup, Icon } from '@qt/design';
import React from 'react';

export default class extends React.Component {
  render() {
    return (
      <ButtonGroup>
        <Button type="primary" icon={<Icon type="question-circle" size={14} />}>
          图标按钮
        </Button>
        <Button type="primary" icon={<Icon type="question-circle" size={14} />} />
        <Button type="primary">
          <Icon type="question-circle" size={14} />
        </Button>
      </ButtonGroup>
    );
  }
}
```

### 按钮大小

通过设置 size 为 small medium large 分别把按钮设为小、中、大尺寸。若不设置 size，则尺寸为中。

```
import { Button, ButtonGroup } from '@qt/design';
import React from 'react';

export default class extends React.Component {
  render() {
    return (
      <ButtonGroup>
        <Button type="primary" size="large">
          Large Button
        </Button>
        <Button type="primary" size="medium">
          Medium Button
        </Button>
        <Button type="primary" size="small">
          Small Button
        </Button>
      </ButtonGroup>
    );
  }
}
```

### 不可用状态

添加 disabled 属性即可让按钮处于不可用状态，同时按钮样式也会改变

```
import { Button, ButtonGroup } from '@qt/design';
import React from 'react';

export default class extends React.Component {
  render() {
    return (
      <ButtonGroup wrap={true} size={['small', 'small']}>
        <Button type="primary" disabled={true}>
          Primary Button
        </Button>
        <Button type="default" disabled={true}>
          Default Button
        </Button>
        <Button type="danger" disabled={true}>
          Danger Button
        </Button>
        <Button type="dashed" disabled={true}>
          Dashed Button
        </Button>
        <Button type="text" disabled={true}>
          Text Button
        </Button>
      </ButtonGroup>
    );
  }
}
```

### 加载中状态

添加 loading 属性即可让按钮处于加载状态。通过 loadingText 属性可以更改加载中时显示的文案。

```
import { Button, ButtonGroup } from '@qt/design';
import React from 'react';

export default class extends React.Component {
  render() {
    return (
      <ButtonGroup wrap={true} size={['small', 'small']}>
        <Button type="primary" loading={true}>
          Primary Button
        </Button>
        <Button type="default" loading={true}>
          Default Button
        </Button>
        <Button type="danger" loading={true}>
          Danger Button
        </Button>
        <Button type="dashed" loading={true}>
          Dashed Button
        </Button>
        <Button type="text" loading={true}>
          Text Button
        </Button>
        <Button loading={true} loadingText="自定义加载文案">
          自定义加载文案
        </Button>
      </ButtonGroup>
    );
  }
}
```

### block 按钮

使用 block 属性将使按钮适合其父宽度。

```
import { Button, ButtonGroup } from '@qt/design';
import React from 'react';

export default class extends React.Component {
  render() {
    return (
      <ButtonGroup direction="vertical">
        <Button type="primary" block={true}>
          Primary Button
        </Button>
        <Button type="default" block={true}>
          Default Button
        </Button>
        <Button type="danger" block={true}>
          Danger Button
        </Button>
        <Button type="dashed" block={true}>
          Dashed Button
        </Button>
        <Button type="text" block={true}>
          Text Button
        </Button>
      </ButtonGroup>
    );
  }
}
```

## Api
