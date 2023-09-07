import { MOOVE, ORIENTATION } from "../type/enum";
import { isEnum } from "./isEnum";
import { isNumeric } from "./isNumeric";

test("Testing isEnum()", () => {
  expect(isEnum(ORIENTATION, "E")).toBe(true);
  expect(isEnum(ORIENTATION, "P")).toBe(false);
  expect(isEnum(MOOVE, "D")).toBe(true);
  expect(isEnum(MOOVE, "W")).toBe(false);
});

test("Testing isNumeric()", () => {
  expect(isNumeric("234")).toBe(true);
  expect(isNumeric("d3E")).toBe(false);
  expect(isNumeric("1")).toBe(true);
  expect(isNumeric("tre")).toBe(false);
});
