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
  isPublished: Scalars['Boolean']['output'];
  publishedAt: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  tags: Array<Tag>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  newArticle: Scalars['String']['output'];
  newTag: Scalars['String']['output'];
  publishArticle: Scalars['String']['output'];
  updateArticle: Scalars['String']['output'];
};


export type MutationNewArticleArgs = {
  slug: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationNewTagArgs = {
  slug: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationPublishArticleArgs = {
  slug: Scalars['String']['input'];
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
  allPublicArticles: Array<Article>;
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


export type AllArticlesQuery = { __typename?: 'Query', allArticles: Array<{ __typename?: 'Article', slug: string, title: string, publishedAt: string, updatedAt: string, isPublished: boolean }> };

export type ArticleQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type ArticleQuery = { __typename?: 'Query', article?: { __typename?: 'Article', slug: string, title: string, publishedAt: string, updatedAt: string, isFavorite: boolean, isPublished: boolean, body: string, tags: Array<{ __typename?: 'Tag', slug: string, name: string }> } | null };

export type AllTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTagsQuery = { __typename?: 'Query', allTags: Array<{ __typename?: 'Tag', slug: string, name: string }> };

export type NewTagMutationVariables = Exact<{
  slug: Scalars['String']['input'];
  title: Scalars['String']['input'];
}>;


export type NewTagMutation = { __typename?: 'Mutation', newTag: string };

export type NewArticleMutationVariables = Exact<{
  slug: Scalars['String']['input'];
  title: Scalars['String']['input'];
}>;


export type NewArticleMutation = { __typename?: 'Mutation', newArticle: string };

export type UpdateArticleMutationVariables = Exact<{
  slug: Scalars['String']['input'];
  title: Scalars['String']['input'];
  tags: Array<Scalars['String']['input']> | Scalars['String']['input'];
  isFavorite: Scalars['Boolean']['input'];
  body: Scalars['String']['input'];
}>;


export type UpdateArticleMutation = { __typename?: 'Mutation', updateArticle: string };

export type PublishArticleMutationVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type PublishArticleMutation = { __typename?: 'Mutation', publishArticle: string };


export const AllArticlesDocument = gql`
    query allArticles {
  allArticles {
    slug
    title
    publishedAt
    updatedAt
    isPublished
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
    isFavorite
    isPublished
    tags {
      slug
      name
    }
    body
  }
}
    `;
export const AllTagsDocument = gql`
    query allTags {
  allTags {
    slug
    name
  }
}
    `;
export const NewTagDocument = gql`
    mutation newTag($slug: String!, $title: String!) {
  newTag(slug: $slug, title: $title)
}
    `;
export const NewArticleDocument = gql`
    mutation newArticle($slug: String!, $title: String!) {
  newArticle(slug: $slug, title: $title)
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
export const PublishArticleDocument = gql`
    mutation publishArticle($slug: String!) {
  publishArticle(slug: $slug)
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
    allTags(variables?: AllTagsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AllTagsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllTagsQuery>(AllTagsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'allTags', 'query');
    },
    newTag(variables: NewTagMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<NewTagMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<NewTagMutation>(NewTagDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'newTag', 'mutation');
    },
    newArticle(variables: NewArticleMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<NewArticleMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<NewArticleMutation>(NewArticleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'newArticle', 'mutation');
    },
    updateArticle(variables: UpdateArticleMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateArticleMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateArticleMutation>(UpdateArticleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateArticle', 'mutation');
    },
    publishArticle(variables: PublishArticleMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<PublishArticleMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<PublishArticleMutation>(PublishArticleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'publishArticle', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;