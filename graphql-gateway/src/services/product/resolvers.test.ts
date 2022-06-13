import DataLoader from "dataloader";
import { GraphQLResolveInfo } from "graphql";
import { ProductService } from ".";
import { AppContext } from "../../types";
import { getLimitOffset } from "../../utils/limitOffsetCursor";
import { Product } from "./models";
import resolvers from "./resolvers";

jest.mock("dataloader");
jest.mock("../../utils/limitOffsetCursor");
jest.mock(".");

const info = {} as GraphQLResolveInfo;
const context = {
  services: {
    product: new ProductService(),
  },
  dataloaders: {
    products: new DataLoader(() => null),
  },
} as AppContext;

describe("Query", () => {
  test("product", async () => {
    (context.dataloaders.products.load as jest.Mock).mockResolvedValue(
      "the product"
    );
    await expect(
      resolvers.Query.product({}, { id: "123" }, context, info)
    ).resolves.toEqual("the product");
  });
  test("productsConnection", async () => {
    (getLimitOffset as jest.Mock).mockReturnValue({ limit: 30, offset: 10 });
    (context.services.product.getProducts as jest.Mock).mockResolvedValue({
      products: ["the product"],
      total_count: 11,
    });
    await expect(
      resolvers.Query.productsConnection(
        {},
        { first: 30, after: "foo" },
        context,
        info
      )
    ).resolves.toEqual({
      nodes: ["the product"],
      totalCount: 11,
      limit: 30,
      offset: 10,
    });
    expect(getLimitOffset).toBeCalledWith(30, "foo");
  });
});
describe("Product", () => {
  const product = { id: 123, title: "the title" } as Product;
  test("id", () => {
    expect(resolvers.Product.id(product, {}, context, info)).toEqual("123");
  });
  test("title", () => {
    expect(resolvers.Product.title(product, {}, context, info)).toEqual(
      "the title"
    );
  });
});
