import { Inter } from 'next/font/google';
import React, { Suspense } from 'react';

import Logo from '../components/Logo';
import StyledComponentsRegistry from '../lib/AntdRegistry';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '问卷调查',
  description: '专业的问卷调查系统',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={inter.className}>
      <StyledComponentsRegistry>
        <Logo />
        <Suspense>
          <main>{children}</main>
        </Suspense>
      </StyledComponentsRegistry>
    </body>
  </html>
);

export default RootLayout;
