import { cookies } from 'next/headers';

import { getAnswers } from '@/app/services/server/answer';
import CardContent from '@/components/CardContent';
import ListPage from '@/components/ListPage';

type DataType = {
  list: any[];
  total: number;
};

async function getData(token: string): Promise<any> {
  const data = await getAnswers(token);

  return data;
}

export default async function Page() {
  const cookiesList = cookies();
  const tokenCookie = cookiesList.get('auth');
  const data: DataType = {
    list: [],
    total: 0,
  };
  if (tokenCookie) {
    const { value } = tokenCookie;
    const result = await getData(value);
    data.list = result.list;
    data.total = parseInt(result.total, 10);
  }
  const { list, total } = data;

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 h-[calc(100vh-129px)] w-full pt-6 px-12">
      {list.map((item: any, index: number) => {
        const { questionId, createdAt } = item;
        const props = {
          questionId,
          createdAt,
        };
        return (
          <>
            <CardContent key={index} {...props}></CardContent>
          </>
        );
      })}
      <ListPage total={total}></ListPage>
    </div>
  );
}
