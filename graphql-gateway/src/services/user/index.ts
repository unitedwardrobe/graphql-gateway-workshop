import axios, { Axios } from "axios";
import { environment } from "../../lib/environment";
import { User } from "./models";

export class UserService {
  private client: Axios;

  constructor(client?: Axios) {
    this.client =
      client ??
      axios.create({
        baseURL: environment.services.user.endpoint,
      });
  }

  public async getBatchUsers(ids: number[]): Promise<User[]> {
    const res = await this.client.get<User[]>("/batch", {
      params: { user_ids: ids.join(",") },
    });
    return res.data;
  }
}
