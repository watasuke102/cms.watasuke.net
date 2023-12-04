// Button.tsx
//
// CopyRight (c) 2023 Watasuke
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
    <button className={class_name} onClick={props.on_click} aria-label={props.aria_label}>
      <div className={css.icon}>{props.icon}</div>
      <span className={css.text}>{props.text}</span>
    </button>
  );
}
