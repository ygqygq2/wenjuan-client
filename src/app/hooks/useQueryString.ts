import { useSearchParams } from 'next/navigation';

export const useQueryString = () => {
  const searchParams = useSearchParams();

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    return params.toString();
  };

  return { createQueryString };
};