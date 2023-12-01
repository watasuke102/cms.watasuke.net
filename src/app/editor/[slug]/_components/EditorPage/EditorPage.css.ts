// EditorPage.css.ts
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
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    alignItems: 'center',
    padding: '0 12px',
    borderBottom: `1px dotted ${color.fg}`,
  }),
  back_button: style({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: '100%',
    fontSize: '1.8em',
  }),
  header_title: style({
    fontSize: '1.4em',
    textAlign: 'right',
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
};
