import { useSearchParams } from 'next/navigation';

export const useQueryString = () => {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams);

  const createQueryString = (name: string, value: string) => {
    delete params[name];
    params[name] = value;
    const queryString = new URLSearchParams(params).toString();
    return queryString;
  };

  return { createQueryString };
};
