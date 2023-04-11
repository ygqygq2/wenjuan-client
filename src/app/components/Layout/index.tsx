'use client';

import type { NextPage } from 'next';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { navs } from './config';
import styles from './index.module.scss';

const Layout: NextPage = () => {
  const pathname = usePathname();
  return (
    <div className={styles.navbar}>
      <section className={styles.logoArea}>Blog-C</section>
      <section className={styles.linkArea}>
        {navs?.map((nav) => (
          <Link className={nav?.value === pathname ? styles.active : ''} key={nav?.label} href={nav?.value}>
            {nav?.label}
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Layout;
