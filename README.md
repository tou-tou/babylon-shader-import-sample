# babylon-shader-import-sample

[![Deploy static content to Pages](https://github.com/drumath2237/babylon-shader-import-sample/actions/workflows/static.yml/badge.svg)](https://github.com/drumath2237/babylon-shader-import-sample/actions/workflows/static.yml)

## About

Vite環境におけるBabylon.jsでシェーダをインポートするときのTipsのためのサンプルプロジェクトです。

## Environment

|                 |   環境   |
| :-------------: | :------: |
|     Node.js     | v16.18.0 |
|      vite       |  v3.2.3  |
| @babylonjs/core | v5.34.0  |

## Install & Usage

```bash
# install packages
yarn install

# loanch dev server
yarn dev
```

### docker-composeを利用する場合
```bash
docker-compose exec -T nginx ash -c "yarn install"

docker-compose exec -T nginx ash -c "yarn build"

docker-compose exec -T nginx ash -c "yarn dev"
```


## デプロイ時
### docker-composeを利用する場合
```bash
docker-compose exec -T nginx ash -c "yarn install"

docker-compose exec -T nginx ash -c "yarn build"

```

## Contact

何かございましたら[にー兄さんのツイッター](https://twitter.com/ninisan_drumath)までご連絡ください。
