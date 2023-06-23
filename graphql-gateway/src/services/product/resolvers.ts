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
  Mutation: {
    favoriteProduct: async (
      _,
      { input: { productId, clientMutationId } },
      context
    ) => {
      const product = await context.services.product.favoriteProduct(
        parseInt(productId, 10)
      );
      context.dataloaders.products.clear(product.id);
      return {
        clientMutationId,
        product,
      };
    },
    unfavoriteProduct: async (
      _,
      { input: { productId, clientMutationId } },
      context
    ) => {
      const product = await context.services.product.unfavoriteProduct(
        parseInt(productId, 10)
      );
      context.dataloaders.products.clear(product.id);
      return {
        clientMutationId,
        product,
      };
    },
  },
  Product: {
    id: (parent) => String(parent.id),
    title: (parent) => parent.title,
    seller: (parent, {}, context) =>
      context.dataloaders.users.load(parent.seller_id),
    favorites: (parent) => parent.favorites,
  },
  ProductsConnection: limitOffsetConnectionResolvers(),
};

export default resolvers;
