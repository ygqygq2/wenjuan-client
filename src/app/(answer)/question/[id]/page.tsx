import { Metadata } from 'next';
import { cookies } from 'next/headers';
import Script from 'next/script';

import { getQuestionById } from '@/app/services/server/question';
import { getComponent } from '@/components/QuestionComponents';

type PropsType = {
  params: { id: string };
};

async function getData(id: string, token: string): Promise<any> {
  const data = await getQuestionById(id, token);

  return data;
}

export async function generateMetadata({ params }: PropsType): Promise<Metadata> {
  const cookiesList = cookies();
  const tokenCookie = cookiesList.get('auth');
  if (tokenCookie) {
    const { value } = tokenCookie;
    const data = await getData(params.id, value);
    const metaData = { title: data?.title || '', desc: data?.desc || '' };
    return {
      title: metaData.title,
      description: metaData.desc,
    };
  }

  return {
    title: '',
    description: '',
  };
}

export default async function Page({ params }: { params: any }) {
  const cookiesList = cookies();
  const tokenCookie = cookiesList.get('auth');
  let data;
  if (tokenCookie) {
    const { value } = tokenCookie;
    data = await getData(params.id, value);
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _id = '', title = '', isDeleted, isPublished, js, componentList = [] } = data || {};

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
      {componentList.map((c: any, index: number) => {
        const ComponentElem = getComponent(c);
        return (
          <div key={c.fe_id} className="border-b border-[#f1f1f1]">
            {ComponentElem}
          </div>
        );
      })}
    </>
  );

  return (
    <>
      <h1 className="text-2xl leading-8 font-semibold text-center text-blue-600">{title}</h1>
      <form method="post" action="/api/answer">
        <input type="hidden" name="questionId" value={_id} />

        {ComponentListElem}

        <div className="text-center m-4">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded">
            提交
          </button>
        </div>
      </form>
      <Script id="page-js">{js}</Script>
    </>
  );
}
