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
        user: {
          endpoint: "http://localhost:4001/user-service",
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
        USER_SERVICE_ENDPOINT: "bar",
      };
      isolatedEnvironment = require(".").environment;
    });
    expect(isolatedEnvironment).toEqual({
      services: {
        product: {
          endpoint: "foo",
        },
        user: {
          endpoint: "bar",
        },
      },
      port: 3000,
    });
  });
});
