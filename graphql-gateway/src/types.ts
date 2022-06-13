import { Dataloaders } from "./dataloaders";
import { Services } from "./services";

export type AppContext = {
  services: Services;
  dataloaders: Dataloaders;
};
