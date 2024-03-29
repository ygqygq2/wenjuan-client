'use client';

import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from '@nextui-org/react';

import React, { FC } from 'react';

type PropsType = {
  _id: number;
  questionId: number;
  createdAt: string;
};

const CardContent: FC<PropsType> = (props: PropsType) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _id, questionId, createdAt } = props;
  const options = { timeZone: 'Asia/Shanghai' };
  // 将 createdAt 转换成北京时间
  const createdAtLocal = new Date(createdAt).toLocaleString('zh-CN', options);

  return (
    <div className="flex justify-center items-center">
      <Card className="h-52 w-52">
        <CardHeader className="flex gap-3">
          <Image alt="nextui logo" height={40} radius="sm" src="./assets/icons/wenjuan.png" width={40} />
          <div className="flex flex-col">
            <p className="text-md">{questionId}</p>
            <p className="text-small text-default-500"></p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="text-[15px]">
          <p>回答时间：</p>
          <p>{createdAtLocal}</p>
        </CardBody>
        <Divider />
        <CardFooter>
          <Link isExternal showAnchorIcon href={`/answer/${_id}`}>
            查看回答
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardContent;
