import DataLoader from "dataloader";
import { GraphQLResolveInfo } from "graphql";
import { AppContext } from "../../types";
import { User } from "./models";
import resolvers from "./resolvers";

jest.mock("dataloader");
jest.mock("../../utils/limitOffsetCursor");
jest.mock(".");

const info = {} as GraphQLResolveInfo;
const context = {
  dataloaders: {
    products: new DataLoader(() => null),
    users: new DataLoader(() => null),
  },
} as AppContext;

describe("Query", () => {
  test("user", async () => {
    (context.dataloaders.users.load as jest.Mock).mockResolvedValue("the user");
    await expect(
      resolvers.Query.user({}, { id: "123" }, context, info)
    ).resolves.toEqual("the user");
  });
});
describe("User", () => {
  const user = { id: 123, name: "the name", product_ids: [456, 789] } as User;
  test("id", () => {
    expect(resolvers.User.id(user, {}, context, info)).toEqual("123");
  });
  test("name", () => {
    expect(resolvers.User.name(user, {}, context, info)).toEqual("the name");
  });
  test("products", async () => {
    (context.dataloaders.products.load as jest.Mock)
      .mockResolvedValueOnce("product 456")
      .mockResolvedValueOnce("product 789");
    await expect(
      resolvers.User.products(user, {}, context, info)
    ).resolves.toEqual(["product 456", "product 789"]);
    expect(context.dataloaders.products.load).toBeCalledTimes(2);
  });
});
