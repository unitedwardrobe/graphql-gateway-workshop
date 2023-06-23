import { Resolvers } from "../../resolver-types";

const resolvers: Resolvers = {
  Query: {
    user: (_, { id }, context) =>
      context.dataloaders.users.load(parseInt(id, 10)),
  },
  User: {
    id: (parent) => String(parent.id),
    name: (parent) => parent.name,
    products: (parent, {}, context) =>
      Promise.all(
        parent.product_ids.map((id) => context.dataloaders.products.load(id))
      ),
  },
};

export default resolvers;
