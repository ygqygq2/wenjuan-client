'use client';

import { FormOutlined } from '@ant-design/icons';
import { Spacer } from '@nextui-org/react';
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';

import { HOME_PATHNAME, ANSWER_INDEX_PATHNAME } from '@/app/config/constants';
import { useGetUserInfo } from '@/app/hooks/useGetUserInfo';

const Logo: FC = () => {
  const { username } = useGetUserInfo();
  const [pathname, setPathname] = useState(HOME_PATHNAME);

  useEffect(() => {
    if (username) {
      setPathname(ANSWER_INDEX_PATHNAME);
    }
  }, [username]);
  return (
    <div className="flex flex-row items-center w-52 h-16 text-center text-2xl text-gray-100">
      <Link href={pathname}>
        <FormOutlined />
        <Spacer />
        <h1>问卷调查</h1>
      </Link>
    </div>
  );
};

export default Logo;
