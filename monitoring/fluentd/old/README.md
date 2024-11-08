# Template of Fluentd

各種サーバのログ監視・可視化

## できること

以下のログを収集する。

- dockerのlogs
- Gatewayのsyslog
- サーバのauthlog

etc...

## 構成

- Fluentd
- elasticsearch
- kibana

構成は以下の通り。

```txt
.
|-- README.md
|-- crond
|   |-- Dockerfile
|   `-- crontab.txt      : 古いログ（2ヶ月以上）の削除設定
|-- docker-compose.yml
|-- fluentd
|   `-- Dockerfile       : fluentdプラグインに関する記述
|   `-- conf
|       `-- fluent.conf  : fluentdの設定ファイル
`-- logs                 : logsのテキストデータ形式でのバックアップ用ファイル（要 777 permission）
```

## References

- <https://github.com/digikin/fluentd-elastic-kibana>
- <https://docs.fluentd.org/container-deployment/docker-compose>
- 上記は最新版に対応していないため、<https://github.com/uken/fluent-plugin-elasticsearch/issues/944> を参照

## コマンド

### 初回セットアップ

```bash
mkdir logs
chmod 777 logs

docker compose up --build -d
```

一定時間経過後、<http://localhost:5601/app/discover> にアクセス。

### 2 回目以降の起動

```bash
docker compose up -d
```

### fluentdの設定ファイルを更新後

```bash

docker restart fluentd
```

新規タグを追加した場合は、[./app/management/kibana/indexPatterns](http://logsrv:5601/app/management/kibana/indexPatterns)にアクセスし、必要に応じてindexPatternsを編集する。

matchタグは[タグの説明](https://docs.fluentd.org/configuration/config-file#how-do-the-match-patterns-work)を参照せよ。
