import { environment } from ".";

describe("environment", () => {
  test("empty environment variables", () => {
    let isolatedEnvironment: typeof environment;
    jest.isolateModules(() => {
      process.env = {};
      isolatedEnvironment = require(".").environment;
    });
    expect(isolatedEnvironment).toEqual({
      services: {
        product: {
          endpoint: "http://localhost:4001/product-service",
        },
      },
      port: 4000,
    });
  });
  test("set environment variables", () => {
    let isolatedEnvironment: typeof environment;
    jest.isolateModules(() => {
      process.env = {
        PORT: "3000",
        PRODUCT_SERVICE_ENDPOINT: "foo",
      };
      isolatedEnvironment = require(".").environment;
    });
    expect(isolatedEnvironment).toEqual({
      services: {
        product: {
          endpoint: "foo",
        },
      },
      port: 3000,
    });
  });
});
