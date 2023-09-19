import { cookies } from 'next/headers';

import { getAnswers } from '@/app/services/server/answer';
import CardContent from '@/components/CardContent';
import ListPage from '@/components/ListPage';
import ListSearch from '@/components/ListSearch';

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
    <div className="flex flex-col">
      <div className="flex pt-3 px-12 justify-items-center">
        <div className="w-3/4">
          <h3 className="text-2xl font-bold">我的回答</h3>
        </div>
        <div className="w-1/4 text-right">
          <ListSearch />
        </div>
      </div>
      <div
        className="flex-1 grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6
        w-full pt-6 px-12 pb-[80px]"
      >
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
      </div>
      <div className="fixed bottom-[80px] left-1/2 transform -translate-x-1/2 opacity-80">
        <ListPage total={total}></ListPage>
      </div>
    </div>
  );
}
