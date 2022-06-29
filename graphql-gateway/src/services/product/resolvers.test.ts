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
    users: new DataLoader(() => null),
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
describe("Mutations", () => {
  test("favoriteProduct", async () => {
    (context.services.product.favoriteProduct as jest.Mock).mockResolvedValue(
      "the product"
    );
    await expect(
      resolvers.Mutation.favoriteProduct(
        {},
        { input: { productId: "123" } },
        context,
        info
      )
    ).resolves.toEqual({ product: "the product" });
    expect(context.services.product.favoriteProduct).toBeCalledWith(123);
  });
  test("unfavoriteProduct", async () => {
    (context.services.product.unfavoriteProduct as jest.Mock).mockResolvedValue(
      "the product"
    );
    await expect(
      resolvers.Mutation.unfavoriteProduct(
        {},
        { input: { productId: "123" } },
        context,
        info
      )
    ).resolves.toEqual({ product: "the product" });
    expect(context.services.product.unfavoriteProduct).toBeCalledWith(123);
  });
});
describe("Product", () => {
  const product = {
    id: 123,
    title: "the title",
    seller_id: 456,
    favorites: 5,
  } as Product;
  test("id", () => {
    expect(resolvers.Product.id(product, {}, context, info)).toEqual("123");
  });
  test("title", () => {
    expect(resolvers.Product.title(product, {}, context, info)).toEqual(
      "the title"
    );
  });
  test("seller", async () => {
    (context.dataloaders.users.load as jest.Mock).mockResolvedValue("the user");
    await expect(
      resolvers.Product.seller(product, {}, context, info)
    ).resolves.toEqual("the user");
  });
  test("favorites", () => {
    expect(resolvers.Product.favorites(product, {}, context, info)).toEqual(5);
  });
});
