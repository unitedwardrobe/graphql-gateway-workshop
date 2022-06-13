import DataLoader from "dataloader";
import { Services } from "./services";
import { Product } from "./services/product/models";

export interface Dataloaders {
  readonly products: DataLoader<number, Product>;
}

export const getDataloaders = (services: Services): Dataloaders => {
  return {
    products: new DataLoader<number, Product>(async (ids: number[]) =>
      services.product.getBatchProducts(ids)
    ),
  };
};
