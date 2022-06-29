/* eslint-disable */
import { GraphQLResolveInfo } from "graphql";
import {
  Product as ProductModel,
  ProductsConnection as ProductsConnectionModel,
} from "./services/product/models";
import { User as UserModel } from "./services/user/models";
import { AppContext } from "./types";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type FavoriteProductInput = {
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  productId: Scalars["ID"]["input"];
};

export type FavoriteProductPayload = {
  __typename?: "FavoriteProductPayload";
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  product: Product;
};

export type Mutation = {
  __typename?: "Mutation";
  favoriteProduct: FavoriteProductPayload;
  unfavoriteProduct: UnfavoriteProductPayload;
};

export type MutationFavoriteProductArgs = {
  input: FavoriteProductInput;
};

export type MutationUnfavoriteProductArgs = {
  input: UnfavoriteProductInput;
};

export type PageInfo = {
  __typename?: "PageInfo";
  endCursor?: Maybe<Scalars["String"]["output"]>;
  hasNextPage: Scalars["Boolean"]["output"];
};

export type Product = {
  __typename?: "Product";
  favorites: Scalars["Int"]["output"];
  id: Scalars["ID"]["output"];
  seller: User;
  title: Scalars["String"]["output"];
};

export type ProductsConnection = {
  __typename?: "ProductsConnection";
  nodes: Array<Product>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type Query = {
  __typename?: "Query";
  product?: Maybe<Product>;
  productsConnection: ProductsConnection;
  user?: Maybe<User>;
};

export type QueryProductArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryProductsConnectionArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  first: Scalars["Int"]["input"];
};

export type QueryUserArgs = {
  id: Scalars["ID"]["input"];
};

export type UnfavoriteProductInput = {
  clientMutationId?: InputMaybe<Scalars["String"]["input"]>;
  productId: Scalars["ID"]["input"];
};

export type UnfavoriteProductPayload = {
  __typename?: "UnfavoriteProductPayload";
  clientMutationId?: Maybe<Scalars["String"]["output"]>;
  product: Product;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  products: Array<Product>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  FavoriteProductInput: FavoriteProductInput;
  FavoriteProductPayload: ResolverTypeWrapper<
    Omit<FavoriteProductPayload, "product"> & {
      product: ResolversTypes["Product"];
    }
  >;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]["output"]>;
  Mutation: ResolverTypeWrapper<{}>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Product: ResolverTypeWrapper<ProductModel>;
  ProductsConnection: ResolverTypeWrapper<ProductsConnectionModel>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  UnfavoriteProductInput: UnfavoriteProductInput;
  UnfavoriteProductPayload: ResolverTypeWrapper<
    Omit<UnfavoriteProductPayload, "product"> & {
      product: ResolversTypes["Product"];
    }
  >;
  User: ResolverTypeWrapper<UserModel>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars["Boolean"]["output"];
  FavoriteProductInput: FavoriteProductInput;
  FavoriteProductPayload: Omit<FavoriteProductPayload, "product"> & {
    product: ResolversParentTypes["Product"];
  };
  ID: Scalars["ID"]["output"];
  Int: Scalars["Int"]["output"];
  Mutation: {};
  PageInfo: PageInfo;
  Product: ProductModel;
  ProductsConnection: ProductsConnectionModel;
  Query: {};
  String: Scalars["String"]["output"];
  UnfavoriteProductInput: UnfavoriteProductInput;
  UnfavoriteProductPayload: Omit<UnfavoriteProductPayload, "product"> & {
    product: ResolversParentTypes["Product"];
  };
  User: UserModel;
};

export type FavoriteProductPayloadResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["FavoriteProductPayload"] = ResolversParentTypes["FavoriteProductPayload"]
> = {
  clientMutationId?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  product?: Resolver<ResolversTypes["Product"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  favoriteProduct?: Resolver<
    ResolversTypes["FavoriteProductPayload"],
    ParentType,
    ContextType,
    RequireFields<MutationFavoriteProductArgs, "input">
  >;
  unfavoriteProduct?: Resolver<
    ResolversTypes["UnfavoriteProductPayload"],
    ParentType,
    ContextType,
    RequireFields<MutationUnfavoriteProductArgs, "input">
  >;
};

export type PageInfoResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["PageInfo"] = ResolversParentTypes["PageInfo"]
> = {
  endCursor?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  hasNextPage?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["Product"] = ResolversParentTypes["Product"]
> = {
  favorites?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  seller?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductsConnectionResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["ProductsConnection"] = ResolversParentTypes["ProductsConnection"]
> = {
  nodes?: Resolver<Array<ResolversTypes["Product"]>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  product?: Resolver<
    Maybe<ResolversTypes["Product"]>,
    ParentType,
    ContextType,
    RequireFields<QueryProductArgs, "id">
  >;
  productsConnection?: Resolver<
    ResolversTypes["ProductsConnection"],
    ParentType,
    ContextType,
    RequireFields<QueryProductsConnectionArgs, "first">
  >;
  user?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, "id">
  >;
};

export type UnfavoriteProductPayloadResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["UnfavoriteProductPayload"] = ResolversParentTypes["UnfavoriteProductPayload"]
> = {
  clientMutationId?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  product?: Resolver<ResolversTypes["Product"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = AppContext,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  products?: Resolver<
    Array<ResolversTypes["Product"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = AppContext> = {
  FavoriteProductPayload?: FavoriteProductPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductsConnection?: ProductsConnectionResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UnfavoriteProductPayload?: UnfavoriteProductPayloadResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};
