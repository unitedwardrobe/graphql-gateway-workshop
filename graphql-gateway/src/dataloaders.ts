import DataLoader from "dataloader";
import { Services } from "./services";
import { Product } from "./services/product/models";
import { User } from "./services/user/models";

export interface Dataloaders {
  readonly products: DataLoader<number, Product>;
  readonly users: DataLoader<number, User>;
}

export const getDataloaders = (services: Services): Dataloaders => {
  return {
    products: new DataLoader<number, Product>(async (ids: number[]) =>
      services.product.getBatchProducts(ids)
    ),
    users: new DataLoader<number, User>(async (ids: number[]) =>
      services.user.getBatchUsers(ids)
    ),
  };
};
