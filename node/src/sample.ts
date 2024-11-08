import * as express from "express";

const PORT = 8000;

const app = express.default();

app.post("/", (req, res) => {
  const { body, url, headers, params } = req;
  console.log({ body, url, headers, params });
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  console.log("get", req);
  res.sendStatus(200);
});

app.listen(PORT);
console.log(`Server running at http://localhost:${PORT}/`);
