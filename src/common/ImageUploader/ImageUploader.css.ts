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
};
