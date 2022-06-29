const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
const productServiceEndpoint =
  process.env.PRODUCT_SERVICE_ENDPOINT ??
  "http://localhost:4001/product-service";
const userServiceEndpoint =
  process.env.USER_SERVICE_ENDPOINT ?? "http://localhost:4001/user-service";

export const environment = {
  services: {
    product: {
      endpoint: productServiceEndpoint,
    },
    user: {
      endpoint: userServiceEndpoint,
    },
  },
  port,
};
