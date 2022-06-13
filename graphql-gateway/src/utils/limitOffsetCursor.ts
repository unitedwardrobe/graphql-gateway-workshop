import { GraphQLError } from "graphql";

export interface LimitOffsetConnection<T = any> {
  nodes: T[];
  limit: number;
  offset: number;
  totalCount: number;
}

export const decode = (cursor: string): number => {
  const decoded = Buffer.from(cursor, "base64").toString("utf8").split(":");

  if (decoded.length !== 2) {
    throw new GraphQLError("cursor is invalid");
  }

  const offset = parseInt(decoded[1], 10);

  if (decoded[0] !== "cursor" || isNaN(offset)) {
    throw new GraphQLError("cursor is invalid");
  }

  return offset;
};

export const encode = (limit: number, offset: number): string =>
  Buffer.from(`cursor:${limit + offset}`, "utf8").toString("base64");

export const getLimitOffset = (first: number, after?: string) => {
  const offset = after ? decode(after) : 0;

  return { limit: first, offset };
};

export const limitOffsetConnectionResolvers = <T>() => ({
  nodes: (parent: LimitOffsetConnection<T>) => parent.nodes,
  pageInfo: (parent: LimitOffsetConnection<T>) => ({
    endCursor: encode(parent.nodes.length, parent.offset),
    hasNextPage: parent.offset + parent.nodes.length < parent.totalCount,
  }),
  totalCount: (parent: LimitOffsetConnection<T>) => parent.totalCount,
});
