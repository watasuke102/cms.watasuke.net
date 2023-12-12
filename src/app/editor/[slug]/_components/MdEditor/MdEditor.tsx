// cms.watasuke.net
// CopyRight (c) 2023 watasuke
//
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
'use client';

import React from 'react';
import {css} from './MdEditor.css';
import {Button} from '@cms-common/Button';
import SaveIcon from '@cms-assets/save.svg';
import * as ArticleReducer from '../ArticleReducer';

type Props = {
  state: ArticleReducer.StateType;
  dispatcher: React.Dispatch<ArticleReducer.Action>;
  save: () => void;
};

export default function MdEditor(props: Props): JSX.Element {
  return (
    <div className={css.editor}>
      <div className={css.toolbox}>
        <Button type='outlined' text='published' aria_label='publish' on_click={() => undefined} />
        <Button type='contained' text='save <C-s>' icon={<SaveIcon />} aria_label='save' on_click={props.save} />
      </div>
      <textarea
        className={css.textarea}
        value={props.state.body}
        onChange={e =>
          props.dispatcher({
            type: 'body/update',
            data: e.target.value,
          })
        }
      />
    </div>
  );
}
