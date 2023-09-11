import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { ErrMsg, Errno } from '@/app/enum/errno.enum';
import { postAnswer } from '@/app/services/server/answer';

type CreateAnswerResult = {
  _id: number;
};

export async function POST(request: Request) {
  const formData = await request.formData();
  const entries = formData.entries();
  let entry = entries.next();
  const body: any = {};
  while (!entry.done) {
    const [name, value] = entry.value;
    body[name] = value;
    entry = entries.next();
  }

  const cookiesList = cookies();
  const tokenCookie = cookiesList.get('auth');
  if (tokenCookie) {
    const { value } = tokenCookie;
    const result = (await postAnswer(body, value)) as unknown as CreateAnswerResult;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { _id } = result;

    if (_id) {
      const res = { errno: Errno.SUCCESS, msg: ErrMsg[Errno.SUCCESS] };
      return NextResponse.json(res);
    }
    const res = { errno: Errno.ERRNO_10, msg: ErrMsg[Errno.ERRNO_10] };
    return NextResponse.json(res);
  }

  const res = { errno: Errno.ERRNO_11, msg: ErrMsg[Errno.ERRNO_11] };
  return NextResponse.json(res);
}
