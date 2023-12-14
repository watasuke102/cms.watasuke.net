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
import ExpandIcon from '@cms-assets/expand.svg';
import * as ArticleReducer from '../ArticleReducer';
import * as Accordion from '@radix-ui/react-accordion';
import {useShortcut} from '@cms-common/useShortcut/useShortcut';

type Props = {
  is_published: boolean;
  state: ArticleReducer.StateType;
  dispatcher: React.Dispatch<ArticleReducer.Action>;
  save_button_handler: () => void;
  publish_button_handler: () => void;
};

export default function MdEditor(props: Props): JSX.Element {
  useShortcut([{keycode: 'KeyS', handler: props.save_button_handler}], {ctrl: true});
  const [accordion_value, set_accordion_value] = React.useState('');
  return (
    <div className={css.editor}>
      <Accordion.Root
        className={css.toolbox}
        type='single'
        collapsible
        value={accordion_value}
        onValueChange={set_accordion_value}
      >
        <Accordion.Item value='title_editor'>
          <Accordion.Header asChild>
            <div className={css.toolbox_header}>
              <Accordion.Trigger asChild>
                <div className={css.expand_icon}>
                  <ExpandIcon />
                </div>
              </Accordion.Trigger>
              <Button
                type='outlined'
                text={props.is_published ? 'published' : 'publish'}
                aria_label='publish'
                on_click={props.publish_button_handler}
                disabled={props.is_published}
              />
              <Button
                type='contained'
                text='save <C-s>'
                icon={<SaveIcon />}
                aria_label='save'
                on_click={props.save_button_handler}
              />
            </div>
          </Accordion.Header>
          <Accordion.Content className={css.accordion_content}>
            <div className={css.title_editor}>
              <label>Title</label>
              <input
                type='text'
                value={props.state.title}
                onChange={e => props.dispatcher({type: 'title/update', data: e.target.value})}
                className={css.input_text}
              />
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
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
