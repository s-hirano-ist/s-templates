import * as express from "express";

const PORT = 8000;

const app = express.default();

app.post("/", (req, res) => {
  const body: any = [];
  req.on("data", buf => {
    body.push(buf);
  });
  req.on("end", () => {
    const log = JSON.parse(Buffer.concat(body).toString());
    console.log("log", log);
  });
  res.sendStatus(200);
});
app.listen(PORT);
console.log(`Server running at http://localhost:${PORT}/`);
