'use client';

import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from '@nextui-org/react';

import React, { FC } from 'react';

type PropsType = {
  questionId: number;
  createdAt: string;
};

const CardContent: FC<PropsType> = (props: PropsType) => {
  const { questionId, createdAt } = props;
  const options = { timeZone: 'Asia/Shanghai' };
  // 将 createdAt 转换成北京时间
  const createdAtLocal = new Date(createdAt).toLocaleString('zh-CN', options);

  return (
    <>
      <Card className="max-w-[400px] h-[calc(100vh-129px)]">
        <CardHeader className="flex gap-3">
          <Image alt="nextui logo" height={40} radius="sm" src="./assets/icons/wenjuan.png" width={40} />
          <div className="flex flex-col">
            <p className="text-md">{questionId}</p>
            <p className="text-small text-default-500"></p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>回答时间：{createdAtLocal}</p>
        </CardBody>
        <Divider />
        <CardFooter>
          <Link isExternal showAnchorIcon href="https://github.com/nextui-org/nextui">
            查看回答
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default CardContent;
