// page.tsx
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import React from 'react';
import {getSdk} from '@cms-utils/graphql';
import {GraphQLClient} from 'graphql-request';
import Link from 'next/link';

export default async function Top(): Promise<JSX.Element> {
  const sdk = getSdk(new GraphQLClient('http://127.0.0.1:10212/graphql'));
  const data = await sdk.allArticles();
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
