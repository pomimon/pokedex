import { getPokeColor } from "../lib";

test("get poke color from single types", () => {
  const result = getPokeColor(["electric"]);
  expect(result.typeColorA).toBe("#F8D030");
  expect(result.typeColorB).toBe("#F8D030");
});

test("get poke color from two types", () => {
  const result = getPokeColor(["electric", "steel"]);
  expect(result.typeColorA).toBe("#F8D030");
  expect(result.typeColorB).toBe("#B8B8D0");
});
