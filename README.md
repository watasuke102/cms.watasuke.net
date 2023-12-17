# cms.watasuke.net

[https://watasuke.net](https://watasuke.net) の記事をいじる

## setup

1. `git clone --recursive`
2. watasuke.netの `config.ts` とback/下の `config.toml` をそれぞれ作成
3. npm runなど

## directory

2023-12-17現在

```
contents/
├── articles/
│  ├── 2022/
│  │  └── 00_test-2022/
│  │     └── article.md
│  └── 2023/
│     ├── 00_test-2023/
│     │  └── article.md
│     ├── _many-tags/
│     │  └── article.md
│     └── _not-published/
│        └── article.md
├── sitedata/
│  ├── profile.md
│  └── short-profile.md
└── tags.toml
```

`contents/articles/<year>/<index>_<slug>/article.md`

indexとslug：`/^(?<index>[0-9]{2})?_(?<slug>[0-9a-z\-]+)/`

## LICENSE

Dual-licensed; MIT (`LICENSE-MIT` or [The MIT License – Open Source Initiative](https://opensource.org/license/mit/)) or MIT SUSHI-WARE LICENSE (`LICENSE-MIT_SUSHI.md`)
