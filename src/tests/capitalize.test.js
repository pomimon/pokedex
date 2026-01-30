import { capitalize } from "../utils";

test("capitalizes first letter", () => {
  expect(capitalize("pikachu")).toBe("Pikachu");
});
