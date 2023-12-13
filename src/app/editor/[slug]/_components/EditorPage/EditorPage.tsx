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
import {QlError} from '@cms-types/QlError';
import {article_reducer} from '../ArticleReducer';
import {useImmerReducer} from 'use-immer';

type Props = {
  article: NonNullable<ArticleQuery['article']>;
};

export default function EditorPage({article}: Props): JSX.Element {
  const [state, dispatch] = useImmerReducer(article_reducer, {
    body: article.body,
    title: article.title,
    tags: article.tags.map(e => e.slug),
  });
  const [toast_status, set_toast_status] = React.useState({title: 'success', desc: ''});
  const [is_toast_open, set_is_toast_open] = React.useState(false);

  const save = React.useCallback(async () => {
    try {
      const sdk = getSdk(new GraphQLClient(`${apiUrl}/graphql`));
      await sdk.updateArticle({
        slug: article.slug,
        title: state.title,
        tags: state.tags,
        isFavorite: false,
        body: state.body ?? '',
      });
      set_toast_status({title: 'success', desc: ''});
    } catch (err) {
      const error = (err as QlError).response.errors[0];
      set_toast_status({title: error.message, desc: error.extensions});
    }
    set_is_toast_open(true);
  }, [article, state]);

  // hydration errorが出るのを回避する
  const [is_first_render, set_is_first_render] = React.useState(true);
  React.useEffect(() => set_is_first_render(false), []);
  if (is_first_render) {
    return <Loading />;
  }

  return (
    <>
      <header className={css.header}>
        <Link href='/' className={css.back_button}>
          <LeftIcon />
        </Link>
        <span className={css.header_title}>{state.title}</span>
      </header>
      <section className={css.container}>
        <MdEditor is_published={article.isPublished} state={state} dispatcher={dispatch} save={save} />
        <div className={css.preview}>
          <BlogContent
            data={{
              slug: article.slug,
              title: state.title,
              body: state.body,
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
