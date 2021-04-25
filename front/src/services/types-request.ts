export type ErrorMessage = {
  error: string;
  message: string;
  statusCode: number;
};

export type ResponseList<K extends string, V> = {
  [P in K]: V[];
} & {
  total: number;
};
