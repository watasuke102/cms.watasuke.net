// cms.watasuke.net
// CopyRight (c) 2023 watasuke
//
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import {style} from '@vanilla-extract/css';
import {color} from '@watasuke.net/components/common/color';

export const css = {
  upload_area: style({
    outline: '32px solid transparent',
    display: 'flex',
    flexDirection: 'column',
    border: '3px solid',
    padding: '4px 8px',
    textAlign: 'center',
    borderColor: color.fg,
    transition: 'border-color 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
    ':hover': {
      cursor: 'pointer',
    },
  }),
  dropping_file: style({
    borderColor: color.p0,
    transition: 'border-color 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
  }),
  dnd_prompt: style({
    fontSize: '1.3em',
    fontWeight: 'bold',
  }),
  image_info_editor: style({
    maxWidth: '85dvw',
    display: 'grid',
    gridTemplateColumns: '1fr auto auto',
    gridTemplateRows: '1fr auto',
    gridTemplateAreas: `
    'img label warn'
    'img input input'
    `,
    alignItems: 'end',
    gap: '0 20px',
  }),
  img: style({
    gridArea: 'img',
    margin: 'auto',
    padding: 4,
    border: `3px dotted ${color.fg}`,
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
  buttons: style({
    display: 'grid',
    gridTemplateRows: '40px 32px',
    gap: 4,
    marginTop: 12,
  }),
};
