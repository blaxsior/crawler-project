export type PublicFields<T> = {
  [K in keyof T]: T[K];
};
