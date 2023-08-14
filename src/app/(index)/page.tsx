'use client';

import { Button, ConfigProvider, Typography } from 'antd';
import { useRouter } from 'next/navigation';

import { QUESTION_INDEX_PATHNAME } from '../config/constants';

import styles from './page.module.scss';

const { Title, Paragraph } = Typography;

export default function Page() {
  const router = useRouter();

  return (
    <ConfigProvider>
      <div className={styles.container}>
        <div className={styles.info}>
          <Title>问卷调查 | 在线投票</Title>
          <Paragraph>已累计创建问卷 300 份，发布问卷 100份，收到答卷 1000 份</Paragraph>
          <div>
            <Button type="primary" onClick={() => router.push(QUESTION_INDEX_PATHNAME)}>
              开始使用
            </Button>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
