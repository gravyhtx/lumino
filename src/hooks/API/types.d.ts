export type RequestBody = BodyInit | null | undefined;

export type RequestOptions = {
  method: string;
  headers: HeadersInit;
  body?: RequestBody;
};

export type FetchResponse<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
  request: (url: string, options?: RequestOptions) => Promise<void>;
};

export type FetchError = {
  message: string;
  status?: number; // Optional HTTP status code
};