import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { UserService } from ".";

const client = axios.create();
const mock = new MockAdapter(client);
const service = new UserService(client);

describe("UserService", () => {
  test("getBatchUsers", async () => {
    mock
      .onGet("/batch", { params: { user_ids: "1,2" } })
      .reply(200, "response");
    await expect(service.getBatchUsers([1, 2])).resolves.toEqual("response");
  });
});
