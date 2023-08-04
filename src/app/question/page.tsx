import { cookies } from 'next/headers';

import axios, { get } from '../services/ajax';

async function getData() {
  const data = await get(`/api/question`);
  return data;
}

export default async function Page() {
  const cookiesList = cookies();
  const tokenCookie = cookiesList.get('auth');
  if (tokenCookie) {
    const { value } = tokenCookie;
    axios.defaults.headers.Authorization = `Bearer ${value}`;
  }

  const data = await getData();
  return (
    <>
      <pre>{data}</pre>
    </>
  );
}
