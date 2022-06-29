import { LimitOffsetConnection } from "../../utils/limitOffsetCursor";
import { Product } from "../product/models";
import { User } from "../user/models";

export interface SearchResult {
  search_results: {
    type: "product" | "user";
    id: number;
  }[];
  total_count: number;
}

export type SearchResultParent = User | Product;

export type SearchConnection = LimitOffsetConnection<SearchResultParent>;
