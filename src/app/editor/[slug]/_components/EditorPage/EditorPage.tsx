// EditorPage.tsx
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
'use client';
import React from 'react';
import {css} from './EditorPage.css';
import MdEditor from '../MdEditor/MdEditor';
import {ArticleQuery} from '@cms-utils/graphql';
import {BlogContent} from '@watasuke.net/components/feature/Article/BlogContent/BlogContent';
import Loading from '../../loading';
import Link from 'next/link';

type Props = {
  article: NonNullable<ArticleQuery['article']>;
};

export default function EditorPage({article}: Props): JSX.Element {
  console.log('page.tsx');
  const [body, set_body] = React.useState<string | undefined>();

  // hydration errorが出るのを回避する
  React.useEffect(() => set_body(article.body), []);
  if (!body) {
    return <Loading />;
  }

  return (
    <>
      <header className={css.header}>
        <Link href='/' className={css.back_button}>
          &lt;
        </Link>
        <span className={css.header_title}>{article.title}</span>
      </header>
      <section className={css.container}>
        <MdEditor body={body} set_body={set_body} />
        <div className={css.preview}>
          <BlogContent
            data={{
              slug: article.slug,
              title: article.title,
              body: body,
              tags: article.tags,
              published_at: article.publishedAt,
              updated_at: article.updatedAt,
            }}
          />
        </div>
      </section>
    </>
  );
}
