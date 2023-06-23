import axios, { Axios } from "axios";
import { environment } from "../../lib/environment";
import { SearchResult } from "./models";

export class SearchService {
  private client: Axios;

  constructor(client?: Axios) {
    this.client =
      client ??
      axios.create({
        baseURL: environment.services.search.endpoint,
      });
  }

  public async search(
    query: string,
    limit: number,
    offset: number
  ): Promise<SearchResult> {
    const res = await this.client.get<SearchResult>("/search", {
      params: { query, limit, offset },
    });
    return res.data;
  }
}
