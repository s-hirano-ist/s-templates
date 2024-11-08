import type { Response, Request } from "express";
import passport from "passport";
import passportHttp from "passport-http";
import "dotenv/config";

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

passport.use(
  new passportHttp.DigestStrategy({ qop: "auth" }, (username, done) => {
    if (username === USERNAME) {
      return done(null, username, PASSWORD);
    } else {
      return done(null, false);
    }
  }),
);

export const passportAuthenticate = passport.authenticate("digest", {
  session: false,
});

export const secretController = (_: Request, response: Response) => {
  response.send("SUCCESS");
};
