import Script from 'next/script';

import styles from '@/app/styles/Common.module.scss';

type PropsType = {
  title: string;
  desc?: string;
  css?: string;
  js?: string;
};

export default function QuestionLayout({ children, props }: { children: React.ReactNode; props: PropsType }) {
  const { title, desc = '', css = '', js = '' } = props;

  return (
    <>
      <header>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <style>{css}</style>
      </header>
      <main className={styles.container}>{children}</main>
      <Script id="page-js">{js}</Script>
      <section>{children}</section>;
    </>
  );
}
