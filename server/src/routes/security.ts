import { config } from "dotenv";
import { Router, Request, Response } from "express";
import bodyParser from "body-parser";
import logic from "../logic";
import { LogicError } from "../logic/errors";
import jwt from "jsonwebtoken";
import passport from "passport";
import statusError from "./helpers/status-error";

config();

const router: Router = Router();

const jsonBodyParser = bodyParser.json();

router.post("/register", jsonBodyParser, (req: Request, res: Response) => {
  const { body: { username, email, password } } = req;

  logic.register(username, email, password)
    .then(() => res.status(201).json({ message: "user registered" }))
    .catch((err: Error) => {
      const { message } = err;
      const status = statusError(err);

      res.status(status).json({ message });
    });
});

router.post(
  "/auth",
  [jsonBodyParser, (req: Request, res: Response, next: any) => {
    passport.authenticate("local", { session: false }, err => {
      if (err) {
        const status = statusError(err);
        return res.status(status).json({ message: err.message });
      }

      next();
    })(req, res, next);
  }],
  (req: Request, res: Response) => {
    const { body: { username, password } } = req;

    logic.authenticate(username, password)
      .then(() => {
        const { JWT_SECRET, JWT_EXP } = process.env;

        const token = jwt.sign({ sub: username }, JWT_SECRET, { expiresIn: JWT_EXP });

        res.json({ message: "user authenticated", token });
      })
      .catch((err: Error) => {
        const { message } = err;
        const status = statusError(err);

        res.status(status).json({ message });
      });
  });

export default router;
