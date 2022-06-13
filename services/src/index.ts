import express from "express";
import { allProducts } from "./data/product";
import { allUsers } from "./data/user";

const app = express();
app.use(express.json());

const favoritesMap: Record<number, number> = {};

app.get("/product-service/products", (req, res) => {
  if (
    typeof req.query.limit !== "string" ||
    typeof req.query.offset !== "string"
  ) {
    return res.status(400).send();
  }
  const limit = parseInt(req.query.limit, 10);
  const offset = parseInt(req.query.offset, 10);

  if (
    String(limit) !== req.query.limit ||
    String(offset) !== req.query.offset
  ) {
    return res.status(400).send();
  }
  const products = allProducts.slice(offset, offset + limit).map((product) => ({
    ...product,
    favorites: favoritesMap[product.id] ?? 0,
  }));

  res.status(200).json({
    total_count: allProducts.length,
    products,
  });
});

app.get("/product-service/batch", (req, res) => {
  if (typeof req.query.product_ids !== "string") {
    return res.status(400).send();
  }
  const products = req.query.product_ids
    .split(",")
    .map((id) => {
      const productId = parseInt(id, 10);
      if (String(productId) !== id) {
        res.status(400).send();
        return;
      }
      return allProducts.find((product) => product.id === productId);
    })
    .map((product) => ({
      ...product,
      favorites: favoritesMap[product.id] ?? 0,
    }));

  res.status(200).json(products);
});

app.post("/product-service/favorite", (req, res) => {
  if (typeof req.body.product_id !== "number") {
    return res.status(400).send();
  }
  const productId = req.body.product_id;

  const product = allProducts.find((product) => product.id === productId);

  if (!product) {
    return res.status(404).send();
  }

  if (!favoritesMap[productId]) {
    favoritesMap[productId] = 1;
  } else {
    favoritesMap[productId]++;
  }

  res.status(200).json({ ...product, favorites: favoritesMap[productId] });
});

app.post("/product-service/unfavorite", (req, res) => {
  if (typeof req.body.product_id !== "number") {
    return res.status(400).send();
  }
  const productId = req.body.product_id;

  const product = allProducts.find((product) => product.id === productId);

  if (!product) {
    return res.status(404).send();
  }

  if (favoritesMap[productId] && favoritesMap[productId] > 0) {
    favoritesMap[productId]--;
  }

  res.status(200).json({ ...product, favorites: favoritesMap[productId] });
});

app.get("/user-service/batch", (req, res) => {
  if (typeof req.query.user_ids !== "string") {
    return res.status(400).send();
  }
  const users = req.query.user_ids.split(",").map((id) => {
    const userId = parseInt(id, 10);
    if (String(userId) !== id) {
      return res.status(400).send();
    }
    const user = allUsers.find((user) => user.id === userId);
    return {
      ...user,
      product_ids: allProducts
        .filter((product) => product.seller_id === user.id)
        .map((product) => product.id),
    };
  });

  res.status(200).json(users);
});

app.get("/search-service/search", (req, res) => {
  if (
    typeof req.query.query !== "string" ||
    typeof req.query.limit !== "string" ||
    typeof req.query.offset !== "string"
  ) {
    return res.status(400).send();
  }

  const limit = parseInt(req.query.limit, 10);
  const offset = parseInt(req.query.offset, 10);
  const needle = req.query.query.toLowerCase().trim();

  if (
    String(limit) !== req.query.limit ||
    String(offset) !== req.query.offset
  ) {
    return res.status(400).send();
  }

  const products = allProducts
    .filter((product) => {
      const haystack = product.title.toLowerCase().trim();
      return haystack.search(needle) !== -1;
    })
    .map(({ id }) => ({ type: "product", id }));

  const users = allUsers
    .filter((user) => {
      const haystack = user.name.toLowerCase().trim();
      return haystack.search(needle) !== -1;
    })
    .map(({ id }) => ({ type: "user", id }));

  const results: { type: string; id: number }[] = [];
  const minLength = Math.min(products.length, users.length);

  for (let i = 0; i < minLength; i++) {
    results.push(products[i], users[i]);
  }
  results.push(...products.slice(minLength), ...users.slice(minLength));

  res.status(200).json(results.slice(offset, offset + limit));
});

app.listen(4001, () => {
  console.log("Service is running on port 4001");
});
