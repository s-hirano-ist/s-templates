# Shared GitHub Actions workflows

## GitHub Actions dependencies

Workflow の通常の action は完全なバージョンタグで参照し、
`.github/workflows/actions.lock` でコミットとリポジトリの identity、推移依存を固定します。
lockfile は生成物です。手で編集しないでください。

```bash
gh extension install github/gh-actions-lock --pin v0.4.1
gh actions-lock --migrate-local-actions
gh actions-lock --verify
```

同一リポジトリの composite action は `$/` で workflow のコミットから読み込みます。
checkout は実行するコマンドのために引き続き必要です。
セットアップ処理と実行時の権限は各 workflow で管理します。
composite action 定義内の外部参照は、単独利用時の保護と lint のため SHA 固定を維持します。
生成ツールがタグへ変換した場合は、対応する同じコミット SHA とバージョンコメントへ戻し、
次のコマンドで記録してから再検証します。

```bash
gh actions-lock --no-interactive --no-onboard --no-narrow --ignore-local-actions
```

workflow と composite、lockfile の差分を一緒にレビューしてください。

外部 reusable workflow の呼び出し自体は lockfile の対象外なので SHA 固定を維持します。
内部の action は共有元リポジトリの lockfile で管理します。
Docker image と `run:` 内で取得するツールも Actions lockfile の対象外です。
`gh-actions-lock` 自体は検証 workflow で v0.4.1 に固定しています。

Renovate が action の更新と lockfile の再生成を同じ PR で行います。
通常 workflow の action はタグ、composite は SHA の更新方式を使います。
更新時は `gh actions-lock --verify` と actionlint・ghalint・zizmor の成功を確認してください。
ghalint は lockfile 対応の v1.6.0、zizmor は v1.32.0 を使用します。
actionlint v1.7.12 の未対応構文に対する例外は、`$/` による自リポジトリ action の診断だけに限定しています。

`verify-actions-lockfile` は全 PR と main push で、ファイルを書き換えず検証します。
依存の追加・削除時にも生成を実行し、全 workflow を登録してください。
タグ移動は upstream の履歴を確認します。
通常の更新では解決しない場合だけ手動で `--relock` します。
`--relock` や `--accept-moved` を自動更新処理には追加しません。

公式資料: [GitHub workflow lockfiles](https://docs.github.com/en/actions/concepts/security/workflow-dependency-lockfiles)、
[gh-actions-lock](https://github.com/github/gh-actions-lock)、
[Renovate GitHub Actions](https://docs.renovatebot.com/modules/manager/github-actions/)。
