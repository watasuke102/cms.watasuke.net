// cms.watasuke.net
// CopyRight (c) 2023-2024 watasuke
//
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import React from 'react';
import EditorPage from './_components/EditorPage/EditorPage';
import {getSdk} from '@cms-utils/graphql';
import {GraphQLClient} from 'graphql-request';
import '@watasuke.net/components/common/main.css';

type Props = {
  params: {slug: string};
};

export default async function page(props: Props): Promise<JSX.Element> {
  const sdk = getSdk(new GraphQLClient('http://127.0.0.1:10212/graphql'));
  const query = await sdk.article({slug: props.params.slug});
  if (!query.article) {
    throw Error('article is empty');
  }
  return <EditorPage article={query.article} />;
}
