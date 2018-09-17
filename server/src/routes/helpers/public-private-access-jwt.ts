import passport from "passport";
import { Response, Request } from "express";

/**
 * Middleware to public access and private access
 *
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
function publicPrivateAccessJwt(req: Request, res: Response, next: any) {
  passport.authenticate("jwt", (err, user, info) => {

    if (err) { return next(err); }

    if (user) { req.user = user; }

    next();
  })(req, res, next);
}

export default publicPrivateAccessJwt;
