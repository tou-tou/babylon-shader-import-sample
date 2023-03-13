FROM node:18-alpine as node
FROM nginx:1.23-alpine

# ashシェルをデフォルトに
# -o: ビルド時にオプションをオンにします。
# -e: エラーが発生した場合にシェルを即座に終了します。
# -u: 未定義の変数を使用しようとすると、エラーを発生させます。
# -x: シェルが実行したコマンドを表示します。
# また、pipefail オプションは、パイプライン内で実行されたコマンドのいずれかが失敗した場合に、パイプライン全体を失敗させます。
SHELL ["/bin/ash", "-oeux", "pipefail", "-c"]

# タイムゾーンを日本に設定する
ENV TZ Asia/Tokyo

RUN apk update \
    && apk add --no-cache tzdata \
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone



COPY --from=node /usr/local/bin /usr/local/bin
COPY --from=node /usr/local/lib /usr/local/lib

RUN apk add yarn

COPY ./docker/default.conf /etc/nginx/conf.d/default.conf


WORKDIR /var/www/html








