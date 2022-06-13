import { getServices } from ".";

test("services", () => {
  expect(getServices).not.toThrow();
});
