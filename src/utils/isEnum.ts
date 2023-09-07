import { MOOVE, ORIENTATION } from "../type/enum";

export const isEnum = (e: typeof ORIENTATION | typeof MOOVE, str: string) => {
  return Object.values(e).includes(str);
};
