import { Inter } from 'next/font/google';
import React, { Suspense } from 'react';

import UserInfo from '@/components/UserInfo';

import { Providers } from '@/lib/providers';

import Logo from '../../components/Logo';

import '../globals.css';

import styles from './layout.module.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '问卷调查',
  description: '专业的问卷调查系统',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" className="light">
    <body className={inter.className}>
      <Providers>
        <Suspense>
          <div>
            <div className={styles.header}>
              <div>
                <Logo></Logo>
              </div>
              <div>
                <UserInfo />
              </div>
            </div>
          </div>
          <main className="pb-16">{children}</main>
        </Suspense>
      </Providers>
      <footer className={styles.footer}>问卷调查 - 技术支持 ygqygq2</footer>
    </body>
  </html>
);

export default RootLayout;
