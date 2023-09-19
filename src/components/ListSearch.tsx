'use client';

import SearchIcon from '@material-ui/icons/Search';
import { Input } from '@nextui-org/react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import { LIST_SEARCH_PARAM_KEY } from '@/app/config/constants';
import { useQueryString } from '@/app/hooks/useQueryString';

const ListSearch: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { createQueryString } = useQueryString();

  const [value, setValue] = useState('');
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
    setValue(curVal);
  }, [searchParams]);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const queryString = `${createQueryString(LIST_SEARCH_PARAM_KEY, value)}`;
    const url = `${pathname}?${queryString}`;
    router.push(url);
  }
  return (
    <form onSubmit={handleSearch}>
      <Input
        label=""
        isClearable
        radius="lg"
        classNames={{
          label: 'text-black/50 dark:text-white/90',
          input: [
            'bg-transparent',
            'text-black/90 dark:text-white/90',
            'placeholder:text-default-700/50 dark:placeholder:text-white/60',
          ],
          innerWrapper: 'bg-transparent',
          inputWrapper: [
            'shadow-xl',
            'bg-default-200/50',
            'dark:bg-default/60',
            'backdrop-blur-xl',
            'backdrop-saturate-200',
            'hover:bg-default-200/70',
            'dark:hover:bg-default/70',
            'group-data-[focused=true]:bg-default-200/50',
            'dark:group-data-[focused=true]:bg-default/60',
            '!cursor-text',
          ],
        }}
        placeholder="输入关键字回车搜索"
        startContent={
          <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
        value={value}
        onChange={handleChange}
        onClear={() => setValue('')}
        style={{ width: '260px' }}
      ></Input>
    </form>
  );
};

export default ListSearch;
