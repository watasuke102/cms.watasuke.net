import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Article = {
  __typename?: 'Article';
  body: Scalars['String']['output'];
  isFavorite: Scalars['Boolean']['output'];
  publishedAt: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  tags: Array<Tag>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  year: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  updateArticle: Scalars['String']['output'];
};


export type MutationUpdateArticleArgs = {
  body: Scalars['String']['input'];
  isFavorite: Scalars['Boolean']['input'];
  slug: Scalars['String']['input'];
  tags: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  allArticles: Array<Article>;
  allTags: Array<Tag>;
  article?: Maybe<Article>;
  sitedata: Sitedata;
};


export type QueryArticleArgs = {
  slug: Scalars['String']['input'];
};

export type Sitedata = {
  __typename?: 'Sitedata';
  profile: Scalars['String']['output'];
  shortProfile: Scalars['String']['output'];
};

export type Tag = {
  __typename?: 'Tag';
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type AllArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllArticlesQuery = { __typename?: 'Query', allArticles: Array<{ __typename?: 'Article', slug: string, title: string }> };

export type ArticleQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type ArticleQuery = { __typename?: 'Query', article?: { __typename?: 'Article', slug: string, title: string, publishedAt: string, updatedAt: string, body: string, tags: Array<{ __typename?: 'Tag', slug: string, name: string }> } | null };

export type UpdateArticleMutationVariables = Exact<{
  slug: Scalars['String']['input'];
  title: Scalars['String']['input'];
  tags: Array<Scalars['String']['input']> | Scalars['String']['input'];
  isFavorite: Scalars['Boolean']['input'];
  body: Scalars['String']['input'];
}>;


export type UpdateArticleMutation = { __typename?: 'Mutation', updateArticle: string };


export const AllArticlesDocument = gql`
    query allArticles {
  allArticles {
    slug
    title
  }
}
    `;
export const ArticleDocument = gql`
    query article($slug: String!) {
  article(slug: $slug) {
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
export const UpdateArticleDocument = gql`
    mutation updateArticle($slug: String!, $title: String!, $tags: [String!]!, $isFavorite: Boolean!, $body: String!) {
  updateArticle(
    slug: $slug
    title: $title
    tags: $tags
    isFavorite: $isFavorite
    body: $body
  )
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    allArticles(variables?: AllArticlesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AllArticlesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllArticlesQuery>(AllArticlesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'allArticles', 'query');
    },
    article(variables: ArticleQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ArticleQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ArticleQuery>(ArticleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'article', 'query');
    },
    updateArticle(variables: UpdateArticleMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateArticleMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateArticleMutation>(UpdateArticleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateArticle', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;