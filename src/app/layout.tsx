import { Inter } from 'next/font/google';
import React from 'react';

import '@/app/styles/globals.css';

import StyledComponentsRegistry from '../lib/AntdRegistry';

import Logo from './components/Logo';

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
        {children}
      </StyledComponentsRegistry>
    </body>
  </html>
);

export default RootLayout;
