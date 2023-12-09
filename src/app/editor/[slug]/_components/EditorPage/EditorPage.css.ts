// cms.watasuke.net
// CopyRight (c) 2023 watasuke
//
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import {globalStyle, keyframes, style} from '@vanilla-extract/css';
import {color} from '@watasuke.net/components/common/color';

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
    paddingRight: 12,
    borderBottom: `1px dotted ${color.fg}`,
  }),
  back_button: style({
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    height: '100%',
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

globalStyle(`${css.back_button} svg`, {
  width: 32,
  height: '100%',
});

export const toast = {
  viewpoint: style({
    position: 'fixed',
    top: 12,
    left: '50dvw',
    transform: 'translateX(-50%)',
    listStyle: 'none',
  }),
  root: style({
    padding: 8,
    borderRadius: 2,
    opacity: 0.95,
    color: color.bg,
    backgroundColor: color.p0,
    animationDuration: '0.3s',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',

    display: 'grid',
    gridTemplateRows: 'auto auto',
    gridTemplateColumns: 'auto auto',
    gridTemplateAreas: `
      'title close'
      'desc  close'
    `,
  }),
  title: style({
    gridArea: 'title',
    fontSize: '1.3em',
    fontWeight: 'bold',
  }),
  desc: style({
    gridArea: 'desc',
  }),
  close: style({
    gridArea: 'close',
    border: 'none',
  }),
};

const open = keyframes({
  '0%': {transform: 'translateY(-120%)'},
  '100%': {transform: 'translateY(0%)'},
});
const closed = keyframes({
  '0%': {transform: 'translateY(0%)'},
  '100%': {transform: 'translateY(-120%)'},
});
globalStyle(`${toast.root}[data-state='open']`, {
  animationName: open,
});
globalStyle(`${toast.root}[data-state='closed']`, {
  animationName: closed,
});
globalStyle(`${toast.root}[data-swipe='move']`, {
  transform: 'translateY(var(--radix-toast-swipe-move-y))',
});
