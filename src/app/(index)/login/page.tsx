'use client';

import { Tabs, Tab, Input, Link, Button, Card, CardBody } from '@nextui-org/react';
import { useRequest } from 'ahooks';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { loginService, registerService } from '@/app/services/client/user';

import { setToken } from '@/app/services/client/user-token';

import useUserStore from '@/app/store';

import { ANSWER_INDEX_PATHNAME } from '../../config/constants';

import { encryptPassword } from '../../utils';

const DEFAULT_USERNAME = 'test123';
const DEFAULT_PASSWORD = '123456';

interface LoginFormState {
  username: string;
  password: string;
}

interface RegisterFormState {
  username: string;
  password: string;
  nickname: string;
}

const Home = () => {
  const router = useRouter();
  const { fetchUserData } = useUserStore();
  const [loginFormState, setLoginFormState] = useState<LoginFormState>({
    username: DEFAULT_USERNAME,
    password: DEFAULT_PASSWORD,
  });
  const [registerFormState, setRegisterFormState] = useState<RegisterFormState>({
    username: '',
    password: '',
    nickname: '',
  });
  const [selectedTab, setSelectedTab] = useState<string>('login');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFormState: React.Dispatch<React.SetStateAction<any>>,
    name: string,
  ) => {
    const { value } = e.target;
    setFormState((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const { run: handleLogin } = useRequest(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    async (formState: LoginFormState) => {
      const { username, password } = formState;
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
        fetchUserData();
        router.push(ANSWER_INDEX_PATHNAME);
      },
    },
  );

  const { run: handleRegister } = useRequest(
    async (formState: RegisterFormState) => {
      const { username, password, nickname } = formState;
      // 使用 CryptoJS 对密码进行加密
      const hashedPassword = encryptPassword(password);
      const data = await registerService(username, hashedPassword, nickname);
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        setSelectedTab('login');
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
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selectedTab}
            onSelectionChange={(key: any) => setSelectedTab(key)}
          >
            <Tab key="login" title="Login">
              <form className="flex flex-col gap-4">
                <Input
                  isRequired
                  label="Username"
                  placeholder="请输入用户名"
                  type="text"
                  value={loginFormState.username}
                  onChange={(e) => handleInputChange(e, setLoginFormState, 'username')}
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="请输入密码"
                  type="password"
                  value={loginFormState.password}
                  onChange={(e) => handleInputChange(e, setLoginFormState, 'password')}
                />
                <p className="text-center text-small">
                  需要一个账号？{' '}
                  <Link size="sm" className="cursor-pointer" onPress={() => setSelectedTab('sign-up')}>
                    注册
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary" onClick={() => handleLogin(loginFormState)}>
                    登录
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form className="flex flex-col gap-4 h-[300px]">
                <Input
                  isRequired
                  label="Username"
                  placeholder="请输入用户名"
                  type="text"
                  value={registerFormState.username}
                  onChange={(e) => handleInputChange(e, setRegisterFormState, 'username')}
                />
                <Input
                  isRequired
                  label="Nickname"
                  placeholder="请输入昵称"
                  type="text"
                  value={registerFormState.nickname}
                  onChange={(e) => handleInputChange(e, setRegisterFormState, 'nickname')}
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="请输入密码"
                  type="password"
                  value={registerFormState.password}
                  onChange={(e) => handleInputChange(e, setRegisterFormState, 'password')}
                />
                <p className="text-center text-small">
                  已有账号？{' '}
                  <Link size="sm" className="cursor-pointer" onPress={() => setSelectedTab('login')}>
                    登录
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary" onClick={() => handleRegister(registerFormState)}>
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
