# Test endpoint for fetch, curl, and html server

This repository has been moved to [node-utils](https://github.com/s-hirano-ist/node-utils)

## How To Use?

### HTML server

click on `Go Live` on the bottom right corner.

### Docker Apache2 run

```bash
docker run --name httpd -d -p 80:80 -v "${PWD}"/html:/usr/local/apache2/htdocs/ httpd
```

### REST client

add text to `*.html` file.

### Run any file

```bash
pnpm ts-node src/<file-name>
```

### SQLite Express

```bash
pnpm start
```

### Tests

```bash
pnpm test
pnpm test:sh
```
