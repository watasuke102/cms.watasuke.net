// cms.watasuke.net
// CopyRight (c) 2023 watasuke
//
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import {style} from '@vanilla-extract/css';
import {color} from '@watasuke.net/components/common/color';

export const css = {
  editor: style({
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    height: '100%',
  }),
  toolbox: style({
    display: 'flex',
    width: '100%',
    gap: 12,
    padding: '4px 12px',
    border: `1px solid ${color.fg}`,
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
