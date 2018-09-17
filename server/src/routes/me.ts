import { config } from "dotenv";
import { Router, Request, Response } from "express";
import bodyParser from "body-parser";
const multer = require("multer");
import passport from "passport";
import logic from "../logic";
import statusError from "./helpers/status-error";
import { UserModelInterface } from "../models/user";
import { PostModelInterface } from "../models/post";

config();

const router: Router = Router();

const jsonBodyParser = bodyParser.json();

const upload = multer();

const validateJwt = passport.authenticate("jwt", { session: false });

router.get("/me", [validateJwt], (req: Request, res: Response) => {
  const username = req.user;

  logic.retrieveUser(username)
    .then((user: UserModelInterface) => res.json(user))
    .catch((err: Error) => {
      const { message } = err;
      const status = statusError(err);

      res.status(status).json({ message });
    });
});

router.put("/me", [validateJwt, jsonBodyParser], (req: Request, res: Response) => {
  const username = req.user;
  const { body: { newEmail, name, website, phoneNumber, gender, biography, privateAccount } } = req;

  logic.updateUser(username, newEmail, name, website, phoneNumber, gender, biography, privateAccount)
    .then(() => res.json({ message: "user updated" }))
    .catch((err: Error) => {
      const { message } = err;
      const status = statusError(err);

      res.status(status).json({ message });
    });
});

router.patch("/me/actions/update-password", [validateJwt, jsonBodyParser], (req: Request, res: Response) => {
  const username = req.user;
  const { body: { password, newPassword } } = req;

  logic.updateUserPassword(username, password, newPassword)
    .then(() => res.json({ message: "password updated" }))
    .catch((err: Error) => {
      const { message } = err;
      const status = statusError(err);

      res.status(status).json({ message });
    });
});

router.patch("/me/actions/update-avatar", [validateJwt, upload.single("avatar")], (req: Request | any, res: Response) => {
  const username = req.user;
  const { file } = req;

  if (file) {
    logic.updateUserAvatar(username, file.originalname, file.buffer)
      .then(() => res.json({ message: "avatar updated" }))
      .catch((err: Error) => {
        const { message } = err;
        const status = statusError(err);

        res.status(status).json({ message });
      });
  } else {
    res.status(400).json({ message: "no image received" });
  }
});

router.get("/me/followers", validateJwt, (req: Request, res: Response) => {
  const username = req.user;

  logic.listUserFollowers(username)
    .then((followerUsers: UserModelInterface[]) => res.json(followerUsers))
    .catch((err: Error) => {
      const { message } = err;
      const status = statusError(err);

      res.status(status).json({ message });
    });
});

router.get("/me/followings", validateJwt, (req: Request, res: Response) => {
  const username = req.user;

  logic.listUserFollowings(username)
    .then((followingUsers: UserModelInterface[]) => res.json(followingUsers))
    .catch((err: Error) => {
      const { message } = err;
      const status = statusError(err);

      res.status(status).json({ message });
    });
});

router.get("/me/posts", validateJwt, (req: Request, res: Response) => {
  const username = req.user;

  logic.listUserPosts(username, undefined)
    .then((posts: PostModelInterface[]) => res.json(posts))
    .catch((err: Error) => {
      const { message } = err;
      const status = statusError(err);

      res.status(status).json({ message });
    });
});

router.get("/me/saved", validateJwt, (req: Request, res: Response) => {
  const username = req.user;

  logic.listUserSavedPosts(username, undefined)
    .then((savedPosts: PostModelInterface[]) => res.json(savedPosts))
    .catch((err: Error) => {
      const { message } = err;
      const status = statusError(err);

      res.status(status).json({ message });
    });
});

router.get("/me/wall", validateJwt, (req: Request, res: Response) => {
  const username = req.user;
  const perPage = (req.query.per_page) ? Number(req.query.per_page) : undefined;
  const page = (req.query.page) ? Number(req.query.page) : undefined;

  logic.listUserWall(username, perPage, page)
    .then((posts: PostModelInterface[]) => res.json(posts))
    .catch((err: Error) => {
      const { message } = err;
      const status = statusError(err);

      res.status(status).json({ message });
    });
});

router.get("/me/explore", validateJwt, (req: Request, res: Response) => {
  const username = req.user;
  const perPage = (req.query.per_page) ? Number(req.query.per_page) : undefined;
  const page = (req.query.page) ? Number(req.query.page) : undefined;

  logic.listExplorePosts(username, perPage, page)
    .then((posts: PostModelInterface[]) => res.status(200).json(posts))
    .catch((err: Error) => {
      const { message } = err;
      const status = statusError(err);

      res.status(status).json(message);
    });
});

export default router;
