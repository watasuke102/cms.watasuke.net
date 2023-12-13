// cms.watasuke.net
// CopyRight (c) 2023 watasuke
//
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import {ComplexStyleRule, globalStyle, style} from '@vanilla-extract/css';
import {color} from '@watasuke.net/components/common/color';

const common: ComplexStyleRule = {
  width: '100%',
  height: '100%',
  borderRadius: 2,
  border: 'none',
  display: 'grid',
  whiteSpace: 'nowrap',
  gridTemplateColumns: 'auto 1fr',
};

export const css = {
  enabled: style({
    transitionProperty: 'color, background-color',
    transitionDuration: '0.2s',
    ':hover': {
      transitionProperty: 'color, background-color',
      transitionDuration: '0.2s',
    },
  }),
  disabled: style({
    opacity: 0.8,
  }),
  icon: style({
    aspectRatio: '1 / 1',
    height: '100%',
    gridColumn: '1 / 2',
  }),
  text: style({
    gridColumn: '2 / 3',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    margin: 'auto',
  }),
  button_text: style({
    ...common,
    color: color.p0,
    ':hover': {
      backgroundColor: `${color.p0}44`,
    },
    ':disabled': {
      backgroundColor: 'inherit',
    },
  }),
  button_outlined: style({
    ...common,
    color: color.p0,
    border: `2px solid ${color.p0}`,
    ':hover': {
      backgroundColor: `${color.p0}44`,
    },
    ':disabled': {
      backgroundColor: 'inherit',
    },
  }),
  button_contained: style({
    ...common,
    color: color.bg,
    backgroundColor: color.p0,
    ':hover': {
      backgroundColor: `${color.p0}bb`,
    },
    ':disabled': {
      backgroundColor: color.p0,
    },
  }),
};

globalStyle(`${css.icon} svg`, {
  width: '100%',
  height: '100%',
});
