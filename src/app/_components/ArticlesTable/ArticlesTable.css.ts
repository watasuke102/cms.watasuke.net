// cms.watasuke.net
// CopyRight (c) 2023 watasuke
//
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import {style} from '@vanilla-extract/css';
import {color} from '@watasuke.net/components/common/color';

export const css = {
  table: style({
    width: '95dvw',
  }),
  item: style({
    ':hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  }),
  title: style({
    color: color.p0,
  }),
  slug: style({
    // width: '100%',
  }),
  datetime: style({
    width: 188,
    textAlign: 'center',
  }),
};
