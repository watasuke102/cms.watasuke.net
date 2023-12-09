import type {Meta, StoryObj} from '@storybook/react';
import '@watasuke.net/components/common/main.css';
import '@cms-common/global.css';
import {Button} from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

export const text: StoryObj<typeof Button> = {
  args: {
    type: 'text',
    text: 'Button',
  },
};

export const outlined: StoryObj<typeof Button> = {
  args: {
    type: 'outlined',
    text: 'Button',
  },
};

export const contained: StoryObj<typeof Button> = {
  args: {
    type: 'contained',
    text: 'Button',
  },
};
