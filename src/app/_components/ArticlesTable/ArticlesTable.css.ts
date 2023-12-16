// cms.watasuke.net
// CopyRight (c) 2023 watasuke
//
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import {style} from '@vanilla-extract/css';

export const css = {
  table: style({
    // tableLayout: 'fixed',
    width: '100%',
  }),
  item: style({
    ':hover': {
      cursor: 'pointer',
    },
  }),
  title: style({
    // width: '100%',
  }),
  slug: style({
    // width: '100%',
  }),
  datetime: style({
    width: 188,
    textAlign: 'center',
  }),
};
