// cms.watasuke.net
// CopyRight (c) 2023-2024 watasuke
//
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import React from 'react';

type Props = {
  tags: {
    slug: string;
    name: string;
  }[];
};

export function TagContainer(props: Props): JSX.Element {
  return <span>Tag: {props.tags.map(e => e.name).join(', ')}</span>;
}
