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
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE);
  const totalPage = Math.ceil(total / pageSize);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '', 10) || 1;
    setPage(page);
    const paramsPageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '', 10) || LIST_PAGE_SIZE;
    setPageSize(paramsPageSize);
  }, [searchParams]);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  function handlePageChange(page: number, pageSize: number): void {
    console.log(`${createQueryString(LIST_PAGE_PARAM_KEY, page.toString())}`);
    const queryString = `${createQueryString(LIST_PAGE_PARAM_KEY, page.toString())}&${createQueryString(
      LIST_PAGE_SIZE_PARAM_KEY,
      pageSize.toString(),
    )}`;
    console.log('🚀 ~ file: ListPage.tsx:41 ~ handlePageChange ~ pathname:', pathname);
    console.log('🚀 ~ file: ListPage.tsx:39 ~ queryString ~ queryString:', queryString);
    const url = `${pathname}?${queryString}`;
    router.push(url);
  }
  return (
    <>
      <Pagination
        showControls
        page={page}
        total={totalPage}
        // eslint-disable-next-line @typescript-eslint/no-shadow
        onChange={(page) => handlePageChange(page, pageSize)}
      ></Pagination>
    </>
  );
};

export default ListPage;
