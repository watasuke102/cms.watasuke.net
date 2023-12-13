// cms.watasuke.net
// CopyRight (c) 2023 watasuke
//
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import React from 'react';
import {css} from './Button.css';

type Props = {
  type: 'text' | 'outlined' | 'contained';
  text?: string;
  icon?: JSX.Element;
  aria_label: string;
  disabled?: boolean;
  on_click: () => void;
};

export function Button(props: Props): JSX.Element {
  const class_name = (() => {
    switch (props.type) {
      case 'text':
        return css.button_text;
      case 'outlined':
        return css.button_outlined;
      case 'contained':
        return css.button_contained;
    }
  })();
  return (
    <button
      className={`${props.disabled ? css.disabled : css.enabled} ${class_name}`}
      disabled={props.disabled}
      onClick={props.on_click}
      aria-label={props.aria_label}
    >
      <div className={css.icon}>{props.icon}</div>
      <span className={css.text}>{props.text}</span>
    </button>
  );
}
