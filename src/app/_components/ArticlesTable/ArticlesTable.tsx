// cms.watasuke.net
// CopyRight (c) 2023 watasuke
//
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
'use client';
import React from 'react';
import {css} from './ArticlesTable.css';
import {AllArticlesQuery} from '@cms-utils/graphql';
import {useRouter} from 'next/navigation';

type Props = {
  articles: AllArticlesQuery['allArticles'];
};

function datetime(s: string) {
  if (s === '') {
    return 'none';
  } else {
    return s.replace('T', ' ');
  }
}

export function ArticlesTable(props: Props): JSX.Element {
  const router = useRouter();
  return (
    <>
      <table className={css.table}>
        <thead>
          <tr>
            <th>title</th>
            <th>slug</th>
            <th>updated_at</th>
            <th>published_at</th>
          </tr>
        </thead>
        <tbody>
          {props.articles.map(e => {
            return (
              <tr key={e.slug} className={css.item} onClick={() => router.push(`/editor/${e.slug}`)}>
                <td className={css.title}>{e.title}</td>
                <td className={css.slug}>{e.slug}</td>
                <td className={css.datetime}>{datetime(e.updatedAt)}</td>
                <td className={css.datetime}>{datetime(e.publishedAt)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
