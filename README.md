# GraphQL Gateway Workshop

## 1: Run services

GraphQL communicated with upstream services. In this workshop those services are ran locally. It is a single express service that hosts both the user and the product service. In order to run them:

```sh
# Go to the right directory
cd services

# Install dependencies
npm install

# Start service
npm start
```

## 2: Run GraphQL Gateway

GraphQL requires the upstream services to be running. After which you can the GraphQL gateway running the following in another terminal:

```sh
# Go to the right directory
cd graphql-gateway

# Install dependencies
npm install

# Start service
npm start
```

## 3: Explore the playground

You can interact with the GraphQL Gateway using the playground that is hosted along with GraphQL Gatway.

[http://localhost:4000/graphql](http://localhost:4000/graphql)

You can explore the schema and make a couple of test queries to get yourself familiar with it. Try to figure out how the queries are resolved by checking out the code as well.

## 4. Run the test suite

The gateway has 100% unit test coverage. Let's explore if everything works.

```sh
npm run test
```

The tests should proceed, but you don't know about the coverage. Jest, our testing library, can also generate a report to inform you about that.

```sh
npm run test-coverage
```

You can check the report in `graphql-gateway/coverage/index.html`.

## 5: Write a user query

Implement a new query that gets a user by ID. The user's ID and name should be in the schema.

<details> 
  <summary>Expand to show hints</summary>

- Look at the way `Query.product` works.
- Add a `user` service under `graphql-gateway/src/services`.
- Check `services/user.yml` for the user service schema.
- Add a user dataloader.
- Update the codegen config to use the user model returned by the API.
</details>

## 6: Add `Product.seller` and `User.products` resolver

Add a seller resolver which returns the same user type as the user query. In addition to that, add a products resolver for the user type.

<details> 
  <summary>Expand to show hints</summary>

- Update the `Product` type definition and add the `seller` to it.
- Update the `User` type definition and add the `products` to it.
- Add the resolver to `graphql-gateway/services/product/resolvers.ts` and `graphql-gateway/services/user/resolvers.ts`.
- Reuse the dataloaders from step 4 and 5.
- Use `seller_id` from the product model.
- Use `product_ids` from the user model.
</details>

## 7. Add unit tests for all the new code

Rerun the test suite. Is it failing due to your new changes? Fix all the broken tests. Afterwards write new tests to get the coverage back up at 100% again.

## 8. Add favorite mutations

The product service also contains endpoints to favorite and unfavorite products. We can add those endpoints to the GraphQL schema as mutations. We follow quite a specific naming convention for them:

```graphql
mutation {
  favoriteProduct(input: FavoriteProductInput!): FavoriteProductPayload!
}

input FavoriteProductInput {
  clientMutationId: String
  productId: ID!
}

type FavoriteProductPayload {
  clientMutationId: String
  product: Product!
}
```

The convention is to have a mutation name, which has an input (`${mutationName}Input`) and a payload (`${mutationName}Payload`). Each of them has a `clientMutationId`. This is kind of deprecated since it's used by a specific client (that we don't use anymore) to match operations with their results. However, we are still using it for consistency reasons.

The payload also always returns the updated object. That way the client can update the cache for that specific item.

Implement the mutations for favoriting and unfavoriting products.

The favorites in this example API are stored in-memory in the service. Restarting the service will clear the favorites of all products. In addition to that: normally a favorite is bound to a logged in user. For the sake of the excersize we don't have authorisation so (un)favoriting just increases/decreases the favorites counter every time it's called.

<details>
  <summary>Expand to show hints</summary>

- Add the (un)favorite mutations, inputs and types to `graphql-gateway/services/product/schema.graphql`.
- Check `services/product.yml` for the product service schema.
- Use the response of the (un)favorite call to resolve the product in the mutation's payload.
- Dataloaders store information per request in memory. Ideally you clear (or even update) the existing product in the dataloader.
</details>

## 9. Create the search endpoint

There is also a search service with an endpoint to search with a query for products and users. Implement a query to interact with this endpoint.

<details>
  <summary>Expand to show hints</summary>

- Add a `search` service under `graphql-gateway/src/services`.
- Check `services/search.yml` for the search service schema.
- Look into GraphQL union types for the result type of the query.
- Use the dataloaders for both users and products.
</details>
