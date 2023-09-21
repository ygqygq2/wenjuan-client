declare type DecodedToken = {
  sub: number;
  username: string;
  iat: number;
  exp: number;
};

declare type SearchParamsType = { [key: string]: string | string[] | undefined };
