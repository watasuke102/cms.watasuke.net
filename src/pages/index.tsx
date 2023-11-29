// index.tsx
//
// CopyRight (c) 2023 Watasuke
// Email  : <watasuke102@gmail.com>
// Twitter: @Watasuke102
// This software is released under the MIT or MIT SUSHI-WARE License.
import React from 'react';
import {css} from '../features/pages/index.css';
import '@watasuke.net/components/common/main.css';
import {BlogContent} from '@watasuke.net/components/feature/Article/BlogContent/BlogContent';

export default function Top(): JSX.Element {
  const [body, set_body] = React.useState(md);

  // hydration errorが出るのを回避する
  const [mounted, set_mounted] = React.useState(false);
  React.useEffect(() => set_mounted(true), []);
  if (!mounted) {
    return <></>;
  }

  return (
    <>
      <header className={css.header}></header>
      <section className={css.container}>
        <div className={css.editor}>
          <div className={css.toolbox}>editor menu</div>
          <textarea className={css.textarea} value={body} onChange={e => set_body(e.target.value)} />
        </div>
        <div className={css.preview}>
          <BlogContent
            data={{
              title: 'GitHub Codespaces+Rust+Bevyで最高の開発環境を作ろうと思ったけど駄目だった',
              slug: 'rust-bevy-codespaces-nice',
              body: body,
              published_at: '2023-01-09T03:32:05.000Z',
              updated_at: '2023-05-05T13:41:20.000Z',
              tags: [
                {
                  name: 'tag0',
                  slug: 'tag0',
                },
              ],
            }}
          />
        </div>
      </section>
    </>
  );
}

const md = `## Embed test

![img](https://data.watasuke.net/untitled.jpg)

自分のブログ

https://watasuke.net/blog/article/internship-in-taiwan-nuu/

内部リンクのテスト

https://watasuke.net/blog/article/rust-bevy-codespaces-nice/

末尾スラッシュなし

https://watasuke.net/blog/article/rust-bevy-codespaces-nice

MarkdownのURL

[GitHub: codespaces-examples/rust](https://github.com/codespaces-examples/rust/)

外部

https://github.com/remarkjs/remark-gfm

Twitter

https://twitter.com/Watasuke102/status/1691375399341903872

これはEmbedしたくない

- 箇条書き内のURL
- https://github.com

https://twitter.com

https://www.youtube.com


# TEST

https://markdown-it.github.io/

footnotes付加出来るってマジ？[^test]

:thinking: ← thinking

:thinking_face: ← thinking_face

[^test]: マジらしい

## summary

<details>
  <summary>その他</summary>
  <ul>
    <li><a href="https://github.com/watasuke102/ImgRate">ImgRate</a>：お気に入りとコメントで即座に評価される画像ギャラリー</li>
    <li><a href="https://github.com/watasuke102/discord-voicechat-notice">discord-voicechat-notice</a>：Discord のボイスチャットに誰かが入るとメッセージを送信</li>
    <li><a href="https://github.com/watasuke102/2021-hny">2021-hny</a>：2021年の年賀状代わり</li>
    <li><a href="https://github.com/watasuke102/ExpNote">ExpNote</a>：Flutter 製の簡易的な所持金管理アプリ</li>
    <li><a href="https://github.com/FascodeNet/alterlinux-i3-manager">alterlinux-i3-manager</a>：Alter Linux i3wm 搭載エディションのための設定マネージャ</li>
    <li><a href="https://github.com/watasuke102/TimeTree-AddIvent">TimeTree-AddIvent</a>：TimeTreeのイベント追加を行えるFlutter製アプリ</li>
    <li><a href="https://github.com/watasuke102/TimeTree-NoticeBot-rust">TimeTree-NoticeBot-rust</a>：TimeTree の予定を取得し、Discord で通知</li>
    <li><a href="https://github.com/watasuke102/SchoolFestSTG">SchoolFestSTG</a>：2019年の文化祭展示用に作ったSTG</li>
    <li><a href="https://github.com/watasuke102/MarkStudy">MarkStudy</a>：学習特化をうたう、マークアップによる装飾が可能なテキストエディタ</li>
    <!--
    <li><a href=""></a>：</li>
    -->
  </ul>

detailsタグの中ってMarkdown使える？ **これ太字**

* アスタリスクで列挙
* 2つめ

1. 1
2. 2
3. 3


</details>

## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

+ Create a list by starting a line with \`+\`, \`-\`, or \`*\`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as \`1.\`

Start numbering with offset:

57. foo
1. bar


## Code

Inline \`code\`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

\`\`\`
Sample text here...
\`\`\`

Syntax highlighting

\`\`\` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.

`;
