import { regex } from "../type/regex";

export const isNumeric = (value: string) => {
  return regex.isNumber.test(value);
};
