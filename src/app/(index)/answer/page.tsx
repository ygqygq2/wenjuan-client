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
    <>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 overflow-y-auto h-[calc(100vh-300x)] w-full pt-6 px-12">
        {list.map((item: any, index: number) => {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const { _id, questionId, createdAt } = item;
          const props = {
            _id,
            questionId,
            createdAt,
          };
          return (
            <>
              <CardContent key={index} {...props}></CardContent>
            </>
          );
        })}
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2">
          <ListPage total={total}></ListPage>
        </div>
      </div>
    </>
  );
}
