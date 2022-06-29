import { Resolvers } from "../../resolver-types";
import {
  getLimitOffset,
  limitOffsetConnectionResolvers,
} from "../../utils/limitOffsetCursor";

const resolvers: Resolvers = {
  Query: {
    search: async (_, { query, first, after }, context) => {
      const { limit, offset } = getLimitOffset(first, after);
      const { search_results: searchResults, total_count: totalCount } =
        await context.services.search.search(query, limit, offset);

      const nodes = await Promise.all(
        searchResults.map(({ type, id }) => {
          switch (type) {
            case "product":
              return context.dataloaders.products.load(id);
            case "user":
              return context.dataloaders.users.load(id);
          }
        })
      );
      return {
        nodes,
        totalCount,
        limit,
        offset,
      };
    },
  },
  SearchResult: {
    __resolveType: (parent) =>
      typeof (parent as any).product_ids === "undefined" ? "Product" : "User",
  },
  SearchResultsConnection: limitOffsetConnectionResolvers(),
};

export default resolvers;
