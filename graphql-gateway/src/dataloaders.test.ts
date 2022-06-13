import { getDataloaders } from "./dataloaders";
import { Services } from "./services";
import { ProductService } from "./services/product";

jest.mock("./services/product");

const services = {
  product: new ProductService(),
} as Services;

describe("dataloaders", () => {
  const dataloaders = getDataloaders(services);
  test("product", async () => {
    (services.product.getBatchProducts as jest.Mock).mockResolvedValue([
      "the product",
    ]);
    await expect(dataloaders.products.load(123)).resolves.toEqual(
      "the product"
    );
    expect(services.product.getBatchProducts).toBeCalledWith([123]);
  });
});
