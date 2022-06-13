import { Resolvers } from "../../resolver-types";
import {
  getLimitOffset,
  limitOffsetConnectionResolvers,
} from "../../utils/limitOffsetCursor";

const resolvers: Resolvers = {
  Query: {
    product: (_, { id }, context) =>
      context.dataloaders.products.load(parseInt(id, 10)),
    productsConnection: async (_, { first, after }, context) => {
      const { limit, offset } = getLimitOffset(first, after);
      const { products: nodes, total_count: totalCount } =
        await context.services.product.getProducts(limit, offset);
      return {
        nodes,
        totalCount,
        limit,
        offset,
      };
    },
  },
  Product: {
    id: (parent) => String(parent.id),
    title: (parent) => parent.title,
  },
  ProductsConnection: limitOffsetConnectionResolvers(),
};

export default resolvers;
