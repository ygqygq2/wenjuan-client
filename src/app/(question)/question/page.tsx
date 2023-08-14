import { Empty } from 'antd';
import { cookies } from 'next/headers';

import { get } from '../../services/ajax';

async function getData(token: string) {
  const data = await get(`/api/question`, token);
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
    console.log(data);
  }
  const { list = [], total = 0 } = data;
  return (
    <>
      <h1>我的问卷回答</h1>
      {total === 0 ? (
        <Empty description="暂无数据"></Empty>
      ) : (
        <ul>
          {list.map((answer) => (
            <li key={answer._id}>
              <a href={`/survey/${answer.surveyId}/answer/${answer.id}`}>{answer}</a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
