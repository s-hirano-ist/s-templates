# ログサーバー

gatewayのログを収集している。

## ディレクトリ構成

```txt
.
├── README.md
├── compose.yaml
├── fluentd
│   └── fluent.conf : fluentdの設定ファイル
```

## コマンド

### 初回セットアップ

```bash
docker compose up --build -d
```

[https://localhost:9443](https://localhost:9443)にログが表示される。

### 2 回目以降の起動

```bash
docker compose up -d
```

### fluend の設定ファイルを更新後

```bash

docker restart fluentd
```
