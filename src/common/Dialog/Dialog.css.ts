// cms.watasuke.net
// CopyRight (c) 2023 watasuke
//
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import {globalStyle, keyframes, style} from '@vanilla-extract/css';
import {color} from '@watasuke.net/components/common/color';

const show_bg = keyframes({
  '0%': {opacity: 0},
  '100%': {opacity: 1},
});

const padding = 16;
export const css = {
  overlay: style({
    position: 'fixed',
    width: '100dvw',
    height: '100dvh',
    zIndex: 10240,
    backgroundColor: `${color.bg}aa`,
    animationDuration: '0.2s',
    animationName: show_bg,
  }),
  content: style({
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    padding: padding,
    backgroundColor: color.g0,
  }),
  header: style({
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: 8,
    marginBottom: 4,
  }),
  title: style({
    margin: 0,
  }),
  close_button: style({
    aspectRatio: '1 / 1',
    height: '100%',
    margin: 'auto',
    border: 'none',
  }),
};

globalStyle(`${css.close_button} svg`, {
  // width: '100%',
  height: '100%',
});
