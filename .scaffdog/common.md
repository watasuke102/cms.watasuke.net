---
name: 'common'
root: './src'
output: '**'
ignore: []
questions:
  name: 'name: '
  is_storybook_required:
    confirm: 'Do you need Storybook file?'
    initial: true
---

# `{{ pascal(inputs.name) }}/{{ pascal(inputs.name) }}.tsx`

```tsx
// cms.watasuke.net
// CopyRight (c) 2023 watasuke
//
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import React from 'react';
import {css} from './{{ pascal(inputs.name) }}.css';

export function {{ pascal(inputs.name) }}(): JSX.Element {
  return(
    <></>
  );
}

```

# `{{ pascal(inputs.name) }}/{{ pascal(inputs.name) }}.css.ts`

```ts
// cms.watasuke.net
// CopyRight (c) 2023 watasuke
//
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import {style} from '@vanilla-extract/css';

export const css = {
  a: style({}),
};
```

# `{{ pascal(inputs.name) }}/index.ts`

```ts
// cms.watasuke.net
// CopyRight (c) 2023 watasuke
//
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import { {{ pascal(inputs.name) }} } from './{{ pascal(inputs.name) }}';

export { {{ pascal(inputs.name) }} };

```

# `{{ inputs.is_storybook_required || "!" }}{{ pascal(inputs.name) }}/{{ pascal(inputs.name) }}.stories.tsx`

```tsx
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
import { {{ pascal(inputs.name) }} } from './{{ pascal(inputs.name) }}';

const meta: Meta<typeof {{ pascal(inputs.name) }}> = {
  component: {{ pascal(inputs.name) }},
  parameters: {
    layout: 'centered',
  },
};
export default meta;

export const Main: StoryObj<typeof {{ pascal(inputs.name) }}> = {
  render: () => <{{ pascal(inputs.name) }} />,
};

```
