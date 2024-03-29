import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { ProductService } from ".";

const client = axios.create();
const mock = new MockAdapter(client);
const service = new ProductService(client);

describe("ProductService", () => {
  test("getBatchProducts", async () => {
    mock
      .onGet("/batch", { params: { product_ids: "1,2" } })
      .reply(200, "response");
    await expect(service.getBatchProducts([1, 2])).resolves.toEqual("response");
  });
  test("getProducts", async () => {
    mock
      .onGet("/products", { params: { limit: 1, offset: 2 } })
      .reply(200, "response");
    await expect(service.getProducts(1, 2)).resolves.toEqual("response");
  });
});
