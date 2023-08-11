import { Metadata } from 'next';
import { cookies } from 'next/headers';
import Script from 'next/script';

import axios from '@/app/services/ajax';
import { getQuestionById } from '@/app/services/server/question';
import { getComponent } from '@/components/QuestionComponents';

import styles from './page.module.scss';

type PropsType = {
  params: { id: string };
};

async function getData(id: string): Promise<any> {
  const data = await getQuestionById(id);
  console.log('🚀 ~ file: page.tsx:25 ~ getData ~ data:', data);

  return data;
}

export async function generateMetadata({ params }: PropsType): Promise<Metadata> {
  const data = await getData(params.id);
  const metaData = { title: data?.title || '', desc: data?.desc || '' };
  return {
    title: metaData.title,
    description: metaData.desc,
  };
}

export default async function Page({ params }: { params: any }) {
  const cookiesList = cookies();
  const tokenCookie = cookiesList.get('auth');
  if (tokenCookie) {
    const { value } = tokenCookie;
    axios.defaults.headers.Authorization = `Bearer ${value}`;
  }
  const data = await getData(params.id);
  const { id = '', title = '', isDeleted, isPublished, js, componentList = [] } = data || {};

  // 已经被删除的，提示错误
  if (isDeleted) {
    return (
      <>
        <h1>{title}</h1>
        <p>该问卷已经被删除</p>
      </>
    );
  }

  // 尚未发布的，提示错误
  if (!isPublished) {
    return (
      <>
        <h1>{title}</h1>
        <p>该问卷尚未发布</p>
      </>
    );
  }

  // 遍历组件
  const ComponentListElem = (
    <>
      {componentList.map((c: any) => {
        const ComponentElem = getComponent(c);
        return (
          <div key={c.fe_id} className={styles.componentWrapper}>
            {ComponentElem}
          </div>
        );
      })}
    </>
  );

  return (
    <>
      <form method="post" action="/api/answer">
        <input type="hidden" name="questionId" value={id} />

        {ComponentListElem}

        <div className={styles.submitBtnContainer}>
          <button type="submit">提交</button>
        </div>
      </form>
      <Script id="page-js">{js}</Script>
    </>
  );
}
