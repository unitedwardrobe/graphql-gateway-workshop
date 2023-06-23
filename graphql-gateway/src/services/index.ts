import { ProductService } from "./product";
import { SearchService } from "./search";
import { UserService } from "./user";

export interface Services {
  readonly product: ProductService;
  readonly user: UserService;
  readonly search: SearchService;
}

export const getServices = (): Services => {
  return {
    product: new ProductService(),
    user: new UserService(),
    search: new SearchService(),
  };
};
