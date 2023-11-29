// layout.tsx
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import React from 'react';
import './global.css';
import {css} from './index.css';
import '@watasuke.net/components/common/main.css';

export default function RootLayout({children}: {children: React.ReactNode}): JSX.Element {
  return (
    <html lang='ja'>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link
          href='https://fonts.googleapis.com/css2?family=M+PLUS+1p&family=M+PLUS+Rounded+1c&display=swap'
          rel='stylesheet'
        ></link>
      </head>
      <body>
        <div className={css.container}>
          <section>menu</section>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}