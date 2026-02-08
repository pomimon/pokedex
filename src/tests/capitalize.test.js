import { capitalize } from "../lib";

test("capitalizes first letter", () => {
  expect(capitalize("pikachu")).toBe("Pikachu");
});

test("only capitalizes first letter of string", () => {
  expect(capitalize("mr. mime")).toBe("Mr. mime");
});
