'use client';

import { FormOutlined } from '@ant-design/icons';
import { ConfigProvider, Space, Typography } from 'antd';
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';

import { HOME_PATHNAME, QUESTION_INDEX_PATHNAME } from '@/app/config/constants';
import { useGetUserInfo } from '@/app/hooks/useGetUserInfo';

import styles from './Logo.module.scss';

const { Title } = Typography;

const Logo: FC = () => {
  const { username } = useGetUserInfo();
  const [pathname, setPathname] = useState(HOME_PATHNAME);

  useEffect(() => {
    if (username) {
      setPathname(QUESTION_INDEX_PATHNAME);
    }
  }, [username]);
  return (
    <ConfigProvider>
      <div className={styles.container}>
        <Link href={pathname}>
          <Space>
            <Title>
              <FormOutlined></FormOutlined>
            </Title>
            <Title>问卷调查</Title>
          </Space>
        </Link>
      </div>
    </ConfigProvider>
  );
};

export default Logo;
