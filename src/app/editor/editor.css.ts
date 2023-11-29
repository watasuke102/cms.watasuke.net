// editor.css.ts
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import {color} from '@watasuke.net/components/common/color';
import {style} from '@vanilla-extract/css';

export const css = {
  header: style({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100dvw',
    height: 48,
    borderBottom: `1px dotted ${color.fg}`,
  }),
  container: style({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    height: 'calc(100dvh - 56px - 24px)',
    border: `2px solid ${color.fg}`,
    borderRadius: 4,
    borderTopLeftRadius: 0,
  }),
  preview: style({
    padding: '8px 16px',
    overflowY: 'scroll',
  }),
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
