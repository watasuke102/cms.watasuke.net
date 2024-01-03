// cms.watasuke.net
// CopyRight (c) 2023-2024 watasuke
//
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import '@watasuke.net/components/common/main.css';
import '@cms-common/global.css';
import { TagEditor } from './TagEditor';

const meta: Meta<typeof TagEditor> = {
  component: TagEditor,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

export const Main: StoryObj<typeof TagEditor> = {
  render: () => <TagEditor />,
};
