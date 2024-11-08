# use this file if you want to install node exporter using shellscript.

# download package
wget https://github.com/prometheus/node_exporter/releases/download/v1.7.0/node_exporter-1.7.0.linux-amd64.tar.gz
sudo tar xvfz node_exporter-*.*-amd64.tar.gz
sudo mv node_exporter-*.*-amd64/node_exporter /usr/local/bin/

# add usr to run node_exporter service
sudo useradd -rs /bin/false node_exporter

# remove setup file
sudo tar xvfz node_exporter-*.*-amd64.tar.gz

# add to service
sudo mv ./node_exporter.service /lib/systemd/system/

# restart setting
sudo systemctl daemon-reload
sudo systemctl enable --now node_exporter

# REF: https://www.fosstechnix.com/install-prometheus-and-grafana-on-ubuntu-22-04/
