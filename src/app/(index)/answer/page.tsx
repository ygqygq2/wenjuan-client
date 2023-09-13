import { cookies } from 'next/headers';

import { getAnswers } from '@/app/services/server/answer';

async function getData(token: string): Promise<any> {
  const data = await getAnswers(token);

  return data;
}

export default async function Page() {
  const cookiesList = cookies();
  const tokenCookie = cookiesList.get('auth');
  let data;
  if (tokenCookie) {
    const { value } = tokenCookie;
    data = await getData(value);
  }
  console.log('🚀 ~ file: page.tsx:18 ~ Page ~ data:', data);

  return <div className="flex justify-center items-center h-[calc(100vh-129px)] w-full">内容</div>;
}
