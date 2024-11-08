import express from "express";
import passport from "passport";
import passportHttp from "passport-http";
import { Database } from "sqlite3";
import { internalServerError } from "./error";
import type { RequestRowType, ResponseRowType } from "./types";
import "dotenv/config";

const app = express();

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const IP_ADDRESS = process.env.IP_ADDRESS;
const PORT = process.env.PORT;

passport.use(
  new passportHttp.DigestStrategy({ qop: "auth" }, (username, done) => {
    if (username === USERNAME) {
      return done(null, username, PASSWORD);
    } else {
      return done(null, false);
    }
  }),
);

app.get(
  "/secret",
  passport.authenticate("digest", {
    session: false,
  }),
  (req, res) => {
    res.send("SUCCESS");
  },
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = new Database("./stocks.db", error => {
  if (error) {
    console.error("database error: " + error.message);
  } else {
    // MEMO: serialize: necessary when synchronous processing.
    db.serialize(() => {
      db.run("drop table if exists stocks"); // MEMO: remove this code if you want want to keep the data.
      db.run(
        "create table if not exists stocks( \
          id integer primary key autoincrement, \
          name nverchar(32) not null unique, \
          amount integer check(amount >= 0 and typeof(amount) = 'integer'), \
          sales integer default 0 \
        )",
        error => {
          if (error) console.error("table error: " + error.message);
        },
      );
    });
  }
});

app.get("/health", (_, response) => {
  response.send("Backend is healthy");
});

app.get("/v1/stocks", (_, response) => {
  db.all("select * from stocks", [], (error, rows: ResponseRowType[]) => {
    if (error) {
      internalServerError(response, error);
    } else {
      const output: Record<string, number> = {};
      rows
        .sort((a, b) => (a.name < b.name ? -1 : 1))
        .map(d => {
          output[d.name] = d.amount;
        });
      response.status(200).json(output);
    }
  });
});

app.get("/v1/stocks/:name", (request, response) => {
  db.get(
    "select * from stocks where name = ?",
    request.params.name,
    (error, row: ResponseRowType) => {
      if (error) {
        internalServerError(response, error);
      } else {
        if (row == undefined) {
          response.status(400).json({
            message: "ERROR: Not found",
          });
          console.error("ERROR: not found");
        } else {
          response.status(200).json({ [row.name]: row.amount });
        }
      }
    },
  );
});

app.post("/v1/stocks", (request, response) => {
  const requestBody = request.body as RequestRowType;
  if (requestBody.name == null) {
    response.status(400).json({
      message: "ERROR: Invalid request",
    });
    console.error("ERROR: invalid request");
    return;
  }
  if (requestBody.amount == null) requestBody.amount = 1; // MEMO: if amount is not specified, set 1.

  const stmt = db.prepare("insert into stocks(name,amount) values(?,?)");
  stmt.run([requestBody.name, requestBody.amount], error => {
    if (error) {
      internalServerError(response, error);
    } else {
      response.status(201).json({
        name: requestBody.name,
        amount: requestBody.amount,
      });
    }
  });
});

app.delete("/v1/stocks/", (_, response) => {
  const stmt = db.prepare("delete from stocks");
  stmt.run([], error => {
    if (error) {
      internalServerError(response, error);
    } else {
      response.status(200).json({
        message: "Deleted all",
      });
    }
  });
});

app.delete("/v1/stocks/:name", (request, response) => {
  const name = request.params.name;
  const stmt = db.prepare("delete from stocks where name = ?");
  stmt.run(name, error => {
    if (error) {
      internalServerError(response, error);
    } else {
      response.status(200).json({
        message: `Deleted ${name} if exists`,
      });
    }
  });
});

app.patch("/v1/stocks/:name", (request, response) => {
  const name = request.params.name;
  const reqBody = request.body;
  const stmt = db.prepare("update stocks set amount = ? where name = ?");
  stmt.run([reqBody.amount, name], error => {
    if (error) {
      internalServerError(response, error);
    } else {
      response.status(200).json({
        message: `Updated ${name} if exists`,
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`REST API server ready at: http://${IP_ADDRESS}:${PORT}`);
});

export default app;
