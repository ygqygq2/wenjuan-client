import { get } from '../ajax';

export async function getQuestionById(id: string, token: string) {
  const url = `/api/question/${id}`;
  const data = await get(url, token);
  return data;
}

export async function getQuestionForClient(token: string) {
  const url = `/api/question/client`;
  const data = await get(url, token);
  return data;
}
