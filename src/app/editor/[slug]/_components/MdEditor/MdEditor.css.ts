// MdEditor.css.ts
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import {color} from '@watasuke.net/components/common/color';
import {style} from '@vanilla-extract/css';

export const css = {
  editor: style({
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    height: '100%',
  }),
  toolbox: style({
    padding: '4px 12px',
    backgroundColor: color.fg,
    color: color.bg,
  }),
  textarea: style({
    resize: 'none',
    height: '100%',
    border: 'none',
    ':focus-visible': {
      outline: 'none',
    },
  }),
};
