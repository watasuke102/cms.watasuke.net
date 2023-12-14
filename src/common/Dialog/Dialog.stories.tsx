// cms.watasuke.net
// CopyRight (c) 2023 watasuke
//
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import '@watasuke.net/components/common/main.css';
import '@cms-common/global.css';
import {Dialog} from './Dialog';
import {Button} from '@cms-common/Button';

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

export const Main: StoryObj<typeof Dialog> = {
  args: {
    title: 'Title',
    desc: 'Description',
  },
  render: props => {
    const [is_open, set_is_open] = React.useState(false);
    return (
      <>
        <Button text='open' aria_label='open' type='contained' on_click={() => set_is_open(true)} />
        <Dialog is_open={is_open} set_is_open={set_is_open} title={props.title} desc={props.desc}>
          <span>test</span>
        </Dialog>
      </>
    );
  },
};
