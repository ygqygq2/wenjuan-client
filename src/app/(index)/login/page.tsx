'use client';

import { Tabs, Tab, Input, Link, Button, Card, CardBody } from '@nextui-org/react';
import { useRequest } from 'ahooks';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { loginService } from '@/app/services/client/user';

import { setToken } from '@/app/services/client/user-token';

import { ANSWER_INDEX_PATHNAME } from '../../config/constants';

import { encryptPassword } from '../../utils';

const DEFAULT_USERNAME = 'test123';
const DEFAULT_PASSWORD = '123456';

const Home = () => {
  const router = useRouter();
  const [username, setUsername] = useState(DEFAULT_USERNAME);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);
  const [selected, setSelected] = useState<string>('login');

  const { run } = useRequest(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    async (username: string, password: string) => {
      // 使用 CryptoJS 对密码进行加密
      const hashedPassword = encryptPassword(password);
      const data = await loginService(username, hashedPassword);
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { token = '' } = result;
        setToken(token); // 客户端存储 token
        document.cookie = `auth=${token}`; // 添加 token 到 cookie 中
        // 跳转到 MANAGE_INDEX_PATHNAME
        router.push(ANSWER_INDEX_PATHNAME);
      },
    },
  );

  return (
    <div
      style={{ height: `calc(100vh - 64px - 65px)` }}
      className="flex justify-center items-center h-[calc(100vh - 64px - 65px)] w-full"
    >
      <Card className="max-w-full w-[340px] h-[400px]">
        <CardBody className="overflow-hidden">
          <Tabs fullWidth size="md" aria-label="Tabs form" selectedKey={selected} onSelectionChange={setSelected}>
            <Tab key="login" title="Login">
              <form className="flex flex-col gap-4">
                <Input
                  isRequired
                  label="Username"
                  placeholder="请输入用户名"
                  type="text"
                  defaultValue={DEFAULT_USERNAME}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="请输入密码"
                  type="password"
                  defaultValue={DEFAULT_PASSWORD}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-center text-small">
                  需要一个账号？{' '}
                  <Link size="sm" onPress={() => setSelected('sign-up')}>
                    注册
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary" onClick={() => run(username, password)}>
                    登录
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form className="flex flex-col gap-4 h-[300px]">
                <Input isRequired label="Name" placeholder="请输入用户名" type="password" />
                <Input isRequired label="Nickname" placeholder="请输入昵称" type="text" />
                <Input isRequired label="Password" placeholder="请输入密码" type="password" />
                <p className="text-center text-small">
                  已有账号？{' '}
                  <Link size="sm" onPress={() => setSelected('login')}>
                    登录
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary">
                    注册
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default Home;
