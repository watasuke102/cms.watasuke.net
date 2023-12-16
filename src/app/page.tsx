// cms.watasuke.net
// CopyRight (c) 2023 watasuke
//
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import React from 'react';
import {getSdk} from '@cms-utils/graphql';
import {GraphQLClient} from 'graphql-request';
import Link from 'next/link';
import {QlError} from '@cms-types/QlError';
import {ArticlesTable} from './_components/ArticlesTable';

export default async function Top(): Promise<JSX.Element> {
  const sdk = getSdk(new GraphQLClient('http://127.0.0.1:10212/graphql'));
  let data;
  try {
    data = await sdk.allArticles();
  } catch (err) {
    const error = err as QlError;
    return (
      <>
        {error.response.errors.map((e, i) => (
          <p key={i}>
            {e.message} <br />
            {e.extensions}
          </p>
        ))}
      </>
    );
  }
  return (
    <>
      <h2>Draft</h2>
      <ArticlesTable articles={data.allArticles.filter(e => !e.isPublished)} />
      <h2>Published</h2>
      <ArticlesTable articles={data.allArticles.filter(e => e.isPublished)} />
    </>
  );
}
