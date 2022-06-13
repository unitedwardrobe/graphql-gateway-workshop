import { LimitOffsetConnection } from "../../utils/limitOffsetCursor";

export interface Product {
  id: number;
  title: string;
  seller_id: number;
}

export interface GetProductsResponse {
  products: Product[];
  total_count: number;
}

export type ProductsConnection = LimitOffsetConnection<Product>;
