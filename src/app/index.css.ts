import {style} from '@vanilla-extract/css';

export const css = {
  container: style({
    position: 'absolute',
    top: 56,
    left: 0,
    width: '100dvw',
    height: 'calc(100dvh - 56px)',
    padding: '0 12px',
    display: 'grid',
    gridTemplateColumns: '48px 1fr',
  }),
};
