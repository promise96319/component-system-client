'use client';

import { cache } from 'react';
import { Button, Form, Input } from '@arco-design/web-react';
import './page.scss';
import { postLogin } from '@/services/login';
import { useRouter } from 'next/navigation';

const FormItem = Form.Item;

export default function Login() {
  const styleName = 'login';

  const router = useRouter();

  const handleSubmit = async (values: any) => {
    const res = await postLogin(values);
    if (res.code === 200) {
      localStorage.setItem('token', res.data.accessToken);
      router.push('/');
    }
  };

  return (
    <div className={styleName}>
      <Form className={`${styleName}-loginForm`} layout="vertical" onSubmit={handleSubmit}>
        <div className={`${styleName}-loginForm-title`}>用户登录</div>
        <FormItem label="账户" field="email" rules={[{ required: true }]}>
          <Input placeholder="请输入账户" />
        </FormItem>
        <FormItem label="密码" field="password" rules={[{ required: true }]}>
          <Input.Password placeholder="请输入密码" />
        </FormItem>
        <FormItem>
          <Button htmlType="submit" className={`${styleName}-loginForm-submit`} type="primary">
            登录
          </Button>
        </FormItem>
      </Form>
    </div>
  );
}
