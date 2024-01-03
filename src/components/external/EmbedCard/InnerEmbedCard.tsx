// cms.watasuke.net
// CopyRight (c) 2023-2024 watasuke
//
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import React from 'react';

type Props = {
  slug: string;
};

export function InnerEmbedCard(props: Props): JSX.Element {
  return <span>InnerEmbed: /{props.slug}</span>;
}
