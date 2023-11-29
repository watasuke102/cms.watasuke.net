import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Article = {
  __typename?: 'Article';
  body: Scalars['String'];
  isFavorite: Scalars['Boolean'];
  publishedAt: Scalars['String'];
  slug: Scalars['String'];
  tags: Array<Tag>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  year: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  articles: Array<Article>;
  sitedata: Sitedata;
  tags: Array<Tag>;
};

export type Sitedata = {
  __typename?: 'Sitedata';
  profile: Scalars['String'];
  shortProfile: Scalars['String'];
};

export type Tag = {
  __typename?: 'Tag';
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type AllArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllArticlesQuery = { __typename?: 'Query', articles: Array<{ __typename?: 'Article', slug: string, title: string, publishedAt: string, updatedAt: string, body: string, tags: Array<{ __typename?: 'Tag', slug: string, name: string }> }> };


export const AllArticlesDocument = gql`
    query allArticles {
  articles {
    slug
    title
    publishedAt
    updatedAt
    tags {
      slug
      name
    }
    body
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    allArticles(variables?: AllArticlesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AllArticlesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllArticlesQuery>(AllArticlesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'allArticles', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;