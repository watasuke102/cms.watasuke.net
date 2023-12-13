// cms.watasuke.net
// CopyRight (c) 2023 watasuke
//
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
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

export const Text: StoryObj<typeof Button> = {
  args: {
    type: 'text',
    text: 'Button',
    disabled: false,
  },
};

export const Outlined: StoryObj<typeof Button> = {
  args: {
    type: 'outlined',
    text: 'Button',
    disabled: false,
  },
};

export const Contained: StoryObj<typeof Button> = {
  args: {
    type: 'contained',
    text: 'Button',
    disabled: false,
  },
};
