'use client';

import { Button, Form, Input } from '@arco-design/web-react';
import { useRouter } from 'next/navigation';
import { useRedirectUrl } from '@/hooks/use-redirect-url';
import { Account, useLogin } from '@/services/login';

import './page.scss';

const FormItem = Form.Item;

export default function Login() {
  const styleName = 'login';
  const router = useRouter();
  const redirect = useRedirectUrl();
  const { trigger: login, isMutating } = useLogin();

  const handleSubmit = async (account: Account) => {
    const res = await login(account);
    if (res?.accessToken) {
      router.replace(redirect);
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
          <Button htmlType="submit" className={`${styleName}-loginForm-submit`} type="primary" loading={isMutating}>
            登录
          </Button>
        </FormItem>
      </Form>
    </div>
  );
}
