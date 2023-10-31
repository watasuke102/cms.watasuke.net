// _app.tsx
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT SUSHI-WARE License.
//
import {AppProps} from 'next/app';
import Head from 'next/head';
import React from 'react';

export default function MyApp({Component, pageProps, router}: AppProps): React.ReactElement {
  return (
    <main>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <Component {...pageProps} key={router.route} />
    </main>
  );
}
