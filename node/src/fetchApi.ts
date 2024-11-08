import * as express from "express";

const PORT = 8000;

const app = express.default();

// app.post("/", (req, res) => {
//   const { body, url, headers, params } = req;
//   console.log({ body, url, headers, params });
//   res.sendStatus(200);
// });

const ETH_USD_URL = "https://data.messari.io/api/v1/assets/ETH/metrics";

app.get("/", async (req, res) => {
  console.log("get", req);
  const responseEthUsd = await fetch(ETH_USD_URL, {
    headers: {
      accept: "application/json",
      "x-messari-api-key": "XXX",
    },
  });
  const body = (await responseEthUsd.json()).data.market_data.price_usd;

  console.log("body", body);
  res.sendStatus(200);
});

app.listen(PORT);
console.log(`Server running at http://localhost:${PORT}/`);
