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
import AddPhotoIcon from '@cms-assets/add_photo.svg';
import ExpandIcon from '@cms-assets/expand.svg';
import * as ArticleReducer from '../ArticleReducer';
import * as Accordion from '@radix-ui/react-accordion';
import {useShortcut} from '@cms-common/useShortcut/useShortcut';
import {Dialog} from '@cms-common/Dialog';
import {ImageUploader} from '@cms-common/ImageUploader';

type Props = {
  slug: string;
  is_published: boolean;
  state: ArticleReducer.StateType;
  dispatcher: React.Dispatch<ArticleReducer.Action>;
  save_button_handler: () => void;
  publish_button_handler: () => void;
};

export default function MdEditor(props: Props): JSX.Element {
  useShortcut([{keycode: 'KeyS', handler: props.save_button_handler}], {ctrl: true});
  const textarea_ref = React.createRef<HTMLTextAreaElement>();
  const insert_image_name = React.useCallback(
    (file_name: string) => {
      const cursor_pos = textarea_ref.current?.selectionStart ?? 0;
      /* ideal: blank lines exist both before and after the image like this:
          <...before>

          ![alt](path)

          <after...>
        it means: <before>\n\n<image>\n\n<after>
      */
      let new_body = '';
      if (props.state.body[cursor_pos - 2] && props.state.body[cursor_pos - 2] !== '\n') {
        new_body += '\n';
      }
      if (props.state.body[cursor_pos - 1] && props.state.body[cursor_pos - 1] !== '\n') {
        new_body += '\n';
      }
      new_body += `![](/img/${file_name})`;
      if (props.state.body[cursor_pos] !== '\n') {
        new_body += '\n';
      }
      if (props.state.body[cursor_pos + 1] !== '\n') {
        new_body += '\n';
      }
      // copy is to may fail due to the browser permission, so ignore any exceptions
      navigator.clipboard?.writeText(new_body).catch(() => undefined);

      textarea_ref.current?.focus();
    },
    [textarea_ref],
  );

  const [accordion_value, set_accordion_value] = React.useState('');
  const [is_img_uploader_open, set_is_img_uploader_open] = React.useState(false);

  return (
    <>
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
                  type='outlined'
                  icon={<AddPhotoIcon />}
                  text=''
                  aria_label='open image uploader'
                  on_click={() => set_is_img_uploader_open(true)}
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
          ref={textarea_ref}
          value={props.state.body}
          onChange={e => {
            props.dispatcher({
              type: 'body/update',
              data: e.target.value,
            });
          }}
        />
      </div>
      <Dialog
        title='Upload the image'
        desc='You can upload only png or jpeg'
        is_open={is_img_uploader_open}
        set_is_open={set_is_img_uploader_open}
      >
        <ImageUploader
          slug={props.slug}
          on_complete={file_name => {
            set_is_img_uploader_open(false);
            insert_image_name(file_name);
          }}
        />
      </Dialog>
    </>
  );
}
