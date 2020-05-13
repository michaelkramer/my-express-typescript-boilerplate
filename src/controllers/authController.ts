import passport from "passport";
import _ from "lodash";
import { Express, Response, Request } from "express";

export function routes(app: Express) {
  app.get("/auth", authenticationMiddleware, handler);
  app.get("/auth/facebook", passport.authenticate("facebook"));
  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/login" }),
    authFacebookCallbackHandler,
  );
}

async function handler(req: any, res: Response) {
  //const { query } = req;
  console.log(req.user);
  return res.send({ name: "john" });
}

// async function authFacebookHandler(req: Request, res: Response) {
//   return passport.authenticate("facebook");
// }

async function authFacebookCallbackHandler(req: Request, res: Response) {
  res.redirect("/auth");
}

function authenticationMiddleware(req, res, next) {
  console.log("==>", req.isAuthenticated());

  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}
