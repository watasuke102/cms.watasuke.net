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
    <ul>
      {data.allArticles.map(e => {
        return (
          <li key={e.slug}>
            <Link href={`/editor/${e.slug}`}>
              {e.slug}, {e.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
