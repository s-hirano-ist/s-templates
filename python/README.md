# Python Tester

## Install

```bash
curl -sSf https://rye-up.com/get | RYE_INSTALL_OPTION="--yes" bash
echo 'source "$HOME/.rye/env"' >> ~/.bashrc
source "$HOME/.rye/env"
```

## Run

```bash
rye run python src/SRC_FILE.py
```

## Add packages

```bash
rye add PACKAGE_NAME
rye sync
```
