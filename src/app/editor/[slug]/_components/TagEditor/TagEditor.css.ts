// cms.watasuke.net
// CopyRight (c) 2023 watasuke
//
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import {globalStyle, style} from '@vanilla-extract/css';
import {color} from '@watasuke.net/components/common/color';

export const css = {
  container: style({
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gridTemplateRows: '30px auto',
    gridTemplateAreas: `
    'label button'
    'tags  tags'
    `,
    alignItems: 'center',
    gap: '12px 0',
    margin: '8px 0',
  }),
  tags: style({
    gridArea: 'tags',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  }),
  tag_item: style({
    display: 'grid',
    gap: 4,
    gridTemplateColumns: '1fr 16px',
    padding: '4px 8px',
    border: `1px solid ${color.fg}`,
    borderRadius: 0,
    ':hover': {
      cursor: 'pointer',
    },
  }),
  not_added_tag: style({
    display: 'grid',
    gridTemplateColumns: '32px 1fr',
    alignItems: 'center',
    gap: 8,
    padding: 0,
    marginBottom: 8,
    width: '100%',
    height: 32,
    border: 'none',
    textAlign: 'left',
    ':focus': {
      outline: 'none',
    },
    ':focus-visible': {
      outline: 'none',
    },
  }),
  checkbox_icon: style({
    border: `2px solid ${color.fg}`,
    borderRadius: 4,
    width: '100%',
    height: '100%',
  }),
  checkbox_text: style({
    gridColumn: '2 / 3',
    margin: 'auto 0',
  }),

  new_tag_form: style({
    display: 'flex',
    gap: 12,
  }),
  form_field: style({
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gridTemplateRows: 'auto auto',
    gridTemplateAreas: `
    'label warn'
    'input input'
    `,
    alignItems: 'baseline',
    marginBottom: 12,
  }),
  label: style({
    gridArea: 'label',
    fontSize: '1.2em',
    fontWeight: 'bold',
  }),
  input: style({
    gridArea: 'input',
    border: `1px solid ${color.fg}`,
    ':focus-visible': {
      outline: 'none',
    },
  }),
};

globalStyle(`${css.checkbox_icon} svg`, {
  width: '100%',
  height: '100%',
});
globalStyle(`${css.tag_item} svg`, {
  width: '100%',
  height: '100%',
});
