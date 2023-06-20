import { Metadata } from 'next';

import { getComponent } from '@/app/components/QuestionComponents';

import { getQuestionById } from '@/app/services/question';

import styles from './page.module.scss';

type PropsType = {
  errno: number;
  data?: {
    id: string;
    title: string;
    desc?: string;
    js?: string;
    css?: string;
    isPublished: boolean;
    isDeleted: boolean;
    componentList: Array<any>;
  };
  msg?: string;
};

async function getData(id: string): Promise<PropsType> {
  const data = await getQuestionById(id);

  return data;
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const questionData = await getData(params.id);
  const { data } = questionData;
  const metaData = { title: data?.title || '', desc: data?.desc || '' };
  return {
    title: metaData.title,
    description: metaData.desc,
  };
}

export default async function Page({ params }: { params: any }) {
  const questionData = await getData(params.id);
  const { errno, data, msg = '' } = questionData;
  const { id = '', title = '', isDeleted, isPublished, componentList = [] } = data || {};

  // 数据错误
  if (errno !== 0) {
    throw new Error(msg);
  }

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
      {componentList.map((c) => {
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
    <form method="post" action="/api/answer">
      <input type="hidden" name="questionId" value={id} />

      {ComponentListElem}

      <div className={styles.submitBtnContainer}>
        <button type="submit">提交</button>
      </div>
    </form>
  );
}
