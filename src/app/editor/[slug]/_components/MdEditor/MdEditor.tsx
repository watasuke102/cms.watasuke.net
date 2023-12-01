// MdEditor.tsx
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
'use client';
import React from 'react';
import {css} from './MdEditor.css';

type Props = {
  body: string;
  set_body: (s: string) => void;
};

export default function MdEditor(props: Props): JSX.Element {
  return (
    <div className={css.editor}>
      <div className={css.toolbox}>editor menu</div>
      <textarea className={css.textarea} value={props.body} onChange={e => props.set_body(e.target.value)} />
    </div>
  );
}
