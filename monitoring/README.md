# 監視システム

> [!IMPORTANT]
> このコードの一部は[s-tools](https://github.com/s-hirano-ist/s-tools)に移行し、本レポジトリからは削除しました。

- Grafana
- Prometheus
- Node exporter
- Windows exporter
- Crond
- Fluentd

を利用した監視システムのテンプレート。

## Node exporter

### 初期セットアップ

```bash
bash ./monitoring/client/setup.sh
```

## Windows exporter

## 参考文献

- [Node exporter](https://github.com/prometheus/node_exporter)
- [Grafana for Node exporter](https://grafana.com/grafana/dashboards/1860-node-exporter-full)
- [Windows exporter](https://github.com/prometheus-community/windows_exporter)
- [Grafana for Windows exporter](https://grafana.com/grafana/dashboards/14694-windows-exporter-dashboard)
