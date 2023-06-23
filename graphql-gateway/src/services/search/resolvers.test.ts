import DataLoader from "dataloader";
import { GraphQLResolveInfo } from "graphql";
import { SearchService } from ".";
import { AppContext } from "../../types";
import { getLimitOffset } from "../../utils/limitOffsetCursor";
import resolvers from "./resolvers";

jest.mock("dataloader");
jest.mock("../../utils/limitOffsetCursor");
jest.mock(".");

const info = {} as GraphQLResolveInfo;
const context = {
  services: {
    search: new SearchService(),
  },
  dataloaders: {
    products: new DataLoader(() => null),
    users: new DataLoader(() => null),
  },
} as AppContext;

describe("Query", () => {
  test("search", async () => {
    (getLimitOffset as jest.Mock).mockReturnValue({ limit: 30, offset: 10 });
    (context.services.search.search as jest.Mock).mockResolvedValue({
      search_results: [
        { type: "product", id: 123 },
        { type: "user", id: 456 },
      ],
      total_count: 11,
    });
    (context.dataloaders.products.load as jest.Mock).mockResolvedValue(
      "the product"
    );
    (context.dataloaders.users.load as jest.Mock).mockResolvedValue("the user");
    await expect(
      resolvers.Query.search(
        {},
        { query: "foo", first: 30, after: "bar" },
        context,
        info
      )
    ).resolves.toEqual({
      nodes: ["the product", "the user"],
      totalCount: 11,
      limit: 30,
      offset: 10,
    });
    expect(getLimitOffset).toBeCalledWith(30, "bar");
  });
});
describe("SearchResult", () => {
  describe("_resolveType", () => {
    it('returns "User"', () => {
      expect(
        resolvers.SearchResult.__resolveType(
          { product_ids: "product ids" } as any,
          context,
          info
        )
      ).toEqual("User");
    });
    it('returns "Product"', () => {
      expect(
        resolvers.SearchResult.__resolveType({} as any, context, info)
      ).toEqual("Product");
    });
  });
});
