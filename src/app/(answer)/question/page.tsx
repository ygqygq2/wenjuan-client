import { cookies } from 'next/headers';

import { get } from '../../services/ajax';

type QuestionType = {
  _id: number;
  title: string;
  isPublished: boolean;
  publishedAt: string;
};

type QuestionsType = {
  list: QuestionType[];
  total: number;
};

async function getData(token: string): Promise<QuestionsType> {
  const data = await get(`/api/question/client`, token);
  console.log('🚀 ~ file: page.tsx:22 ~ getData ~ data:', data);
  return data;
}

export const metadata = {
  title: '问卷调查',
  description: '专业的问卷调查系统',
};

export default async function Page() {
  const cookiesList = cookies();
  const tokenCookie = cookiesList.get('auth');
  let data;
  if (tokenCookie) {
    const { value } = tokenCookie;
    data = await getData(value);
  }
  const { list = [], total = 0 } = data || {};
  return (
    <>
      <h1>我的问卷回答</h1>
      {total === 0 ? (
        <p>暂无数据</p>
      ) : (
        <ul>
          {list.map((answer) => (
            <li key={answer._id}>
              <a href={`/survey/${answer._id}/answer/${answer._id}`}>{answer.title}</a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
