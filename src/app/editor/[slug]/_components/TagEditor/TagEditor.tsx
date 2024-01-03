// cms.watasuke.net
// CopyRight (c) 2023-2024 watasuke
//
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
'use client';
import React from 'react';
import {css} from './TagEditor.css';
import {GraphQLClient} from 'graphql-request';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Form from '@radix-ui/react-form';
import AddIcon from '@cms-assets/add.svg';
import CloseIcon from '@cms-assets/close.svg';
import CheckIcon from '@cms-assets/check.svg';
import {getSdk} from '@cms-utils/graphql';
import * as ArticleReducer from '../ArticleReducer';
import {apiUrl} from '@config';
import {Button} from '@cms-common/Button';
import {Dialog} from '@cms-common/Dialog';

type Props = {
  current_tags: string[];
  all_tags: ArticleReducer.StateType['all_tags'];
  dispatcher: React.Dispatch<ArticleReducer.Action>;
};

export function TagEditor(props: Props): JSX.Element {
  const [is_dialog_open, set_is_dialog_open] = React.useState(false);
  const tags = React.useMemo(() => new Map(props.all_tags.map(e => [e.slug, e.name])), [props.all_tags]);
  const [selected_tag, set_selected_tag] = React.useState<string[]>([]);
  function toggle_selected_tag(slug: string) {
    if (selected_tag.indexOf(slug) === -1) {
      set_selected_tag([...selected_tag, slug]);
    } else {
      set_selected_tag(selected_tag.filter(e => e !== slug));
    }
  }

  const [is_create_tag, set_is_create_tag] = React.useState(false);
  const [new_tag_slug, set_new_tag_slug] = React.useState('');
  const [new_tag_title, set_new_tag_title] = React.useState('');

  function handle_add_tag_button() {
    if (is_create_tag) {
      if (new_tag_slug === '' || new_tag_title === '') {
        return;
      }
      const sdk = getSdk(new GraphQLClient(`${apiUrl}/graphql`));
      sdk
        .newTag({slug: new_tag_slug, title: new_tag_title})
        .then(() => sdk.allTags().then(res => props.dispatcher({type: 'alltag/update', all_tags: res.allTags})));
    }
    const add_tags = selected_tag.concat(is_create_tag ? [new_tag_slug] : []);
    props.dispatcher({type: 'tag/add', add_tags});
    set_selected_tag([]);
    set_is_dialog_open(false);
  }

  return (
    <>
      <section className={css.container}>
        <span>Tags</span>
        <Button
          type='outlined'
          text=''
          icon={<AddIcon />}
          aria_label='add new tag'
          on_click={() => set_is_dialog_open(true)}
        />
        <div className={css.tags}>
          {props.current_tags.map((e, i) => (
            <div
              key={`tag_${i}_${e}`}
              className={css.tag_item}
              onClick={() => props.dispatcher({type: 'tag/remove', data: e})}
            >
              {tags.get(e)}
              <CloseIcon />
            </div>
          ))}
        </div>
      </section>

      <Dialog
        is_open={is_dialog_open}
        set_is_open={set_is_dialog_open}
        title='Add new tag'
        desc='Select tag(s) you want to add or create new one'
      >
        <div>
          {props.all_tags
            .filter(e => props.current_tags.indexOf(e.slug) === -1)
            .map(e => (
              <Checkbox.Root
                key={e.slug}
                className={css.not_added_tag}
                checked={selected_tag.indexOf(e.slug) !== -1}
                onCheckedChange={() => toggle_selected_tag(e.slug)}
              >
                <div className={css.checkbox_icon}>
                  <Checkbox.Indicator asChild>
                    <CheckIcon />
                  </Checkbox.Indicator>
                </div>
                <span className={css.checkbox_text}>{e.name}</span>
              </Checkbox.Root>
            ))}
        </div>
        <Checkbox.Root
          className={css.not_added_tag}
          checked={is_create_tag}
          onCheckedChange={f => set_is_create_tag(f === true)}
        >
          <div className={css.checkbox_icon}>
            <Checkbox.Indicator asChild>
              <CheckIcon />
            </Checkbox.Indicator>
          </div>
          <span className={css.checkbox_text}>Create new tag</span>
        </Checkbox.Root>
        <Form.Root onSubmit={e => e.preventDefault()}>
          <div className={css.new_tag_form}>
            <Form.Field name='slug' className={css.form_field}>
              <Form.Label className={css.label}>slug</Form.Label>
              <Form.Message match='valueMissing'>Cannot be empty</Form.Message>
              <Form.Control asChild>
                <input
                  className={css.input}
                  type='text'
                  value={new_tag_slug}
                  onChange={e => set_new_tag_slug(e.target.value)}
                  disabled={!is_create_tag}
                  required
                />
              </Form.Control>
            </Form.Field>
            <Form.Field name='title' className={css.form_field}>
              <Form.Label className={css.label}>Title</Form.Label>
              <Form.Message match='valueMissing'>Cannot be empty</Form.Message>
              <Form.Control asChild>
                <input
                  className={css.input}
                  type='text'
                  value={new_tag_title}
                  onChange={e => set_new_tag_title(e.target.value)}
                  disabled={!is_create_tag}
                  required
                />
              </Form.Control>
            </Form.Field>
          </div>
          <Form.Submit asChild>
            <Button type='contained' text='Add' aria_label='add' on_click={handle_add_tag_button} />
          </Form.Submit>
        </Form.Root>
      </Dialog>
    </>
  );
}
