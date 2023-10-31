// _app.tsx
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT SUSHI-WARE License.
//
import React from 'react';
import {Html, Head, Main, NextScript} from 'next/document';

export default function Document(): React.ReactElement {
  return (
    <Html>
      <Head>
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/gh/krishdevdb/reseter.css@1.20/css/reseter.min.css'
          id='reseter.css'
        />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link
          href='https://fonts.googleapis.com/css2?family=M+PLUS+1p&family=M+PLUS+Rounded+1c&display=swap'
          rel='stylesheet'
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
