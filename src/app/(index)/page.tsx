'use client';

import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import { ANSWER_INDEX_PATHNAME } from '../config/constants';

import styles from './page.module.scss';

export default function Page() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h1 className="text-[38px] mb-[0.5em] font-semibold">问卷调查 | 在线投票</h1>
        <p className="text-[14px] leading-[22px]">已累计创建问卷 300 份，发布问卷 100份，收到答卷 1000 份</p>
        <div className="mt-[14px]">
          <Button color="primary" onClick={() => router.push(ANSWER_INDEX_PATHNAME)}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  );
}
