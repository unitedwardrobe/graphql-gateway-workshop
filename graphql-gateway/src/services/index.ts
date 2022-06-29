import { ProductService } from "./product";

export interface Services {
  readonly product: ProductService;
}

export const getServices = (): Services => {
  return {
    product: new ProductService(),
  };
};
