import { get, post } from '../ajax';

// 提交答卷
export async function postAnswer(answerInfo: any, token: string) {
  const url = '/api/answer';
  const data = await post(url, answerInfo, token);
  return data;
}

// 获取回答列表
export async function getAnswers(token: string, searchParams: SearchParamsType) {
  const url = '/api/answer/';
  const data = await get(url, token, searchParams);
  return data;
}
