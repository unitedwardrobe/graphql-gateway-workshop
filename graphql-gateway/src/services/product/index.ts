import axios, { Axios } from "axios";
import { environment } from "../../lib/environment";
import { GetProductsResponse, Product } from "./models";

export class ProductService {
  private client: Axios;

  constructor(client?: Axios) {
    this.client =
      client ??
      axios.create({
        baseURL: environment.services.product.endpoint,
      });
  }

  public async getBatchProducts(ids: number[]): Promise<Product[]> {
    const res = await this.client.get<Product[]>("/batch", {
      params: { product_ids: ids.join(",") },
    });
    return res.data;
  }

  public async getProducts(
    limit: number,
    offset: number
  ): Promise<GetProductsResponse> {
    const res = await this.client.get<GetProductsResponse>("/products", {
      params: { limit, offset },
    });
    return res.data;
  }
}
