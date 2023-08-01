'use server';

import { cookies } from 'next/headers';

export async function create(name: string, value: string) {
  const expirationData = new Date();
  expirationData.setHours(expirationData.getHours() + 24);

  const data = {
    name,
    value,
    expires: expirationData,
    path: '/',
  };
  cookies().set(data);
}
