// cms.watasuke.net
// CopyRight (c) 2023 watasuke
//
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
'use client';

import React from 'react';
import {BlogContent} from '@watasuke.net/components/feature/Article/BlogContent/BlogContent';
import Link from 'next/link';
import {GraphQLClient} from 'graphql-request';
import {getSdk} from '@cms-utils/graphql';
import {ArticleQuery} from '@cms-utils/graphql';
import MdEditor from '../MdEditor/MdEditor';
import Loading from '../../loading';
import LeftIcon from '@cms-assets/left.svg';
import CloseIcon from '@cms-assets/close.svg';
import {css, toast} from './EditorPage.css';
import {apiUrl} from '@config';
import * as Toast from '@radix-ui/react-toast';

type Props = {
  article: NonNullable<ArticleQuery['article']>;
};

type QlError = {
  response: {
    errors: {
      message: string;
    }[];
  };
};

export default function EditorPage({article}: Props): JSX.Element {
  const [body, set_body] = React.useState<string | undefined>();
  const [toast_status, set_toast_status] = React.useState({title: 'success', desc: ''});
  const [is_toast_open, set_is_toast_open] = React.useState(false);

  const save = React.useCallback(async () => {
    try {
      const sdk = getSdk(new GraphQLClient(`${apiUrl}/graphql`));
      await sdk.updateArticle({
        slug: article.slug,
        title: article.title,
        tags: article.tags.map(e => e.slug),
        isFavorite: false,
        body: body ?? '',
      });
      set_toast_status({title: 'success', desc: ''});
    } catch (e) {
      set_toast_status({title: 'fail', desc: (e as QlError).response.errors[0].message});
    }
    set_is_toast_open(true);
  }, [article, body]);

  // hydration errorが出るのを回避する
  React.useEffect(() => set_body(article.body), []);
  if (!body) {
    return <Loading />;
  }

  return (
    <>
      <header className={css.header}>
        <Link href='/' className={css.back_button}>
          <LeftIcon />
        </Link>
        <span className={css.header_title}>{article.title}</span>
      </header>
      <section className={css.container}>
        <MdEditor body={body} set_body={set_body} save={save} />
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

      <Toast.Provider swipeDirection='up' duration={3000}>
        <Toast.Root className={toast.root} open={is_toast_open} onOpenChange={set_is_toast_open}>
          <Toast.Title className={toast.title}>{toast_status.title}</Toast.Title>
          <Toast.Description className={toast.desc}>{toast_status.desc}</Toast.Description>
          <Toast.Close className={toast.close}>
            <CloseIcon />
          </Toast.Close>
        </Toast.Root>
        <Toast.Viewport className={toast.viewpoint} />
      </Toast.Provider>
    </>
  );
}
