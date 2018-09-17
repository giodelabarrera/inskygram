import { config } from "dotenv";
import { Router, Response, Request } from "express";
import logic from "../logic";
import { PostModelInterface } from "../models/post";
import { UserModelInterface } from "../models/user";
import statusError from "./helpers/status-error";

config();

const router: Router = Router();

router.get("/search", (req: Request, res: Response) => {
  const { query: { q } } = req;

  logic.search(q)
    .then((users: UserModelInterface[]) => res.status(200).json(users))
    .catch((err: Error) => {
      const { message } = err;
      const status = statusError(err);

      res.status(status).json(message);
    });
});

export default router;
