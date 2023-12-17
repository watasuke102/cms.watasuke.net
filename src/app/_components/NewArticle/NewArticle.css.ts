// cms.watasuke.net
// CopyRight (c) 2023 watasuke
//
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import {style} from '@vanilla-extract/css';
import {color} from '@watasuke.net/components/common/color';

export const css = {
  header: style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
