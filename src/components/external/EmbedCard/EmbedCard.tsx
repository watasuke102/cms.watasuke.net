// EmbedCard.tsx
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import React from 'react';

type Props = {
  url: string;
};

export function EmbedCard(props: Props): JSX.Element {
  return <span>Embed: {props.url}</span>;
}
