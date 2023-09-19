'use client';

import { Pagination } from '@nextui-org/react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';

import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE, LIST_PAGE_SIZE_PARAM_KEY } from '@/app/config/constants';
import { useQueryString } from '@/app/hooks/useQueryString';

type PropsType = {
  total: number;
};

const ListPage: FC<PropsType> = (props: PropsType) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { createQueryString } = useQueryString();

  const { total } = props;
  const [page, setPage] = useState(parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '', 10) || 1);
  const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '', 10) || LIST_PAGE_SIZE;
  const totalPage = Math.ceil(total / pageSize);

  useEffect(() => {
    const pageString = `${createQueryString(LIST_PAGE_PARAM_KEY, page.toString())}`;
    const params = new URLSearchParams(`pageSize=${pageSize}&${pageString}`);
    const paramsMap = new Map(params.entries());
    const mergedParams = Array.from(paramsMap.entries())
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    router.push(`${pathname}?${mergedParams}`);
  }, [page]);

  return (
    <>
      <Pagination showControls page={page} total={totalPage} onChange={setPage}></Pagination>
    </>
  );
};

export default ListPage;
