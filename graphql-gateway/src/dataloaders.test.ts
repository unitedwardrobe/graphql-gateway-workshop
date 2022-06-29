import { getDataloaders } from "./dataloaders";
import { Services } from "./services";
import { ProductService } from "./services/product";
import { UserService } from "./services/user";

jest.mock("./services/product");
jest.mock("./services/user");

const services = {
  product: new ProductService(),
  user: new UserService(),
} as Services;

describe("dataloaders", () => {
  const dataloaders = getDataloaders(services);
  test("products", async () => {
    (services.product.getBatchProducts as jest.Mock).mockResolvedValue([
      "the product",
    ]);
    await expect(dataloaders.products.load(123)).resolves.toEqual(
      "the product"
    );
    expect(services.product.getBatchProducts).toBeCalledWith([123]);
  });
  test("users", async () => {
    (services.user.getBatchUsers as jest.Mock).mockResolvedValue(["the user"]);
    await expect(dataloaders.users.load(123)).resolves.toEqual("the user");
    expect(services.user.getBatchUsers).toBeCalledWith([123]);
  });
});
