import {
  decode,
  encode,
  getLimitOffset,
  limitOffsetConnectionResolvers,
} from "./limitOffsetCursor";

describe("limitOffsetCursor", () => {
  describe("encode", () => {
    it("Returns generated cursor", () => {
      expect(encode(1, 1)).toEqual("Y3Vyc29yOjI=");
    });
  });

  describe("decode", () => {
    it("Throws an error when the decoded length is not equal to two", () => {
      expect(() => decode("egj4563y5t34r")).toThrow("cursor is invalid");
    });

    it("Throws an error when the decoded result is NaN", () => {
      expect(() => decode("Y3Vyc29yOmhtZWQ=")).toThrow("cursor is invalid");
    });

    it("Throws an error when the decoded result is NaN", () => {
      expect(decode("Y3Vyc29yOjI=")).toEqual(2);
    });
  });

  describe("getLimitOffset", () => {
    test("no after", () => {
      expect(getLimitOffset(10)).toEqual({ limit: 10, offset: 0 });
    });
    test("first and after", () => {
      expect(getLimitOffset(10, "Y3Vyc29yOjI=")).toEqual({
        limit: 10,
        offset: 2,
      });
    });
  });

  describe("limitOffsetConnectionResolvers", () => {
    test("nodes", () => {
      expect(
        limitOffsetConnectionResolvers().nodes({ nodes: "the nodes" } as any)
      ).toEqual("the nodes");
    });
    test("totalCount", () => {
      expect(
        limitOffsetConnectionResolvers().totalCount({
          totalCount: "the total count",
        } as any)
      ).toEqual("the total count");
    });
    test("pageInfo", () => {
      expect(
        limitOffsetConnectionResolvers().pageInfo({
          totalCount: 3,
          nodes: ["foo"],
          offset: 1,
        } as any)
      ).toEqual({
        endCursor: "Y3Vyc29yOjI=",
        hasNextPage: true,
      });
    });
  });
});
