'use server';

import { cookies } from 'next/headers';

import { isDev } from '@/app/utils';

export async function create(name: string, value: string, httpOnly = true) {
  const expirationData = new Date();
  expirationData.setHours(expirationData.getHours() + 24);

  const data = {
    name,
    value,
    expires: expirationData,
    path: '/',
    httpOnly,
    secure: isDev(),
  };
  cookies().set(data);
}
