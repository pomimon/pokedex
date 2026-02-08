import { capitalize } from "../utils";

test("capitalizes first letter", () => {
  expect(capitalize("pikachu")).toBe("Pikachu");
});

test("capitalizes multiple words", () => {
  expect(capitalize("mr. mime")).toBe("Mr. Mime");
});
