import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { SearchService } from ".";

const client = axios.create();
const mock = new MockAdapter(client);
const service = new SearchService(client);

describe("SearchService", () => {
  test("search", async () => {
    mock
      .onGet("/search", { params: { query: "foo", limit: 30, offset: 10 } })
      .reply(200, "response");
    await expect(service.search("foo", 30, 10)).resolves.toEqual("response");
  });
});
