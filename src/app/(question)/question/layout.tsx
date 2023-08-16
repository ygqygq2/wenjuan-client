import StyledComponentsRegistry from '@/lib/AntdRegistry';

import styles from './layout.module.scss';

export const metadata = {
  title: '问卷调查',
  description: '专业的问卷调查系统',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <StyledComponentsRegistry>
      <body>
        <main className={styles.container}>{children}</main>
        <footer className={styles.footer}>问卷调查 &copy;2023 - present. Created by ygqygq2</footer>
      </body>
    </StyledComponentsRegistry>
  </html>
);

export default RootLayout;
