import { ProductService } from "./product";
import { UserService } from "./user";

export interface Services {
  readonly product: ProductService;
  readonly user: UserService;
}

export const getServices = (): Services => {
  return {
    product: new ProductService(),
    user: new UserService(),
  };
};
