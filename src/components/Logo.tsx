'use client';

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
    <div>
      <Link href={pathname}>
        <div className="flex flex-row items-center sm:text-sm md:text-xl lg:text-3xl text-gray-100 font-semibold">
          <div className="ml-1 mr-2">
            <i className="iconfont">&#xe6b3;</i>
          </div>
          <Spacer />
          <div>
            <h1>问卷调查</h1>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
