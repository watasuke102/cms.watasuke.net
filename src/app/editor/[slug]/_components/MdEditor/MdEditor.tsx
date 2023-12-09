// MdEditor.tsx
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
'use client';

import React from 'react';
import {css} from './MdEditor.css';
import {Button} from '@cms-common/Button';
import SaveIcon from '@cms-assets/save.svg';

type Props = {
  body: string;
  set_body: (s: string) => void;
  save: () => void;
};

export default function MdEditor(props: Props): JSX.Element {
  return (
    <div className={css.editor}>
      <div className={css.toolbox}>
        <Button type='outlined' text='publish' aria_label='publish' on_click={() => undefined} />
        <Button type='contained' text='save <C-s>' icon={<SaveIcon />} aria_label='save' on_click={props.save} />
      </div>
      <textarea className={css.textarea} value={props.body} onChange={e => props.set_body(e.target.value)} />
    </div>
  );
}
