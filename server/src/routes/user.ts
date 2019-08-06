import { config } from 'dotenv';
import { Router, Request, Response } from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import logic from '../logic';
import statusError from './helpers/status-error';
import publicPrivateAccessJwt from './helpers/public-private-access-jwt';
import { IUserModel } from '../models/user';
import { IPostModel } from '../models/post';

config();

const router: Router = Router();

const validateJwt = passport.authenticate('jwt', { session: false });

const jsonBodyParser = bodyParser.json();

router.get('/users/:username', publicPrivateAccessJwt, (req: Request, res: Response) => {
  const username = req.user;
  const targetUsername = req.params.username;

  logic
    .retrieveUser(username, targetUsername)
    .then((user: IUserModel) => res.json(user))
    .catch((err: Error) => {
      const { message } = err;
      const status = statusError(err);

      res.status(status).json({ message });
    });
});

router.post(
  '/users/:username/actions/follow',
  [validateJwt, jsonBodyParser],
  (req: Request, res: Response) => {
    const username = req.user;
    const {
      body: { targetUsername },
    } = req;

    logic
      .toggleFollowUser(username, targetUsername)
      .then(() => res.json({ message: 'toggle follow correctly' }))
      .catch((err: Error) => {
        const { message } = err;
        const status = statusError(err);

        res.status(status).json({ message });
      });
  }
);

router.get('/users/:username/followers', publicPrivateAccessJwt, (req: Request, res: Response) => {
  const username = req.user;
  const targetUsername = req.params.username;

  logic
    .listUserFollowers(username, targetUsername)
    .then((followerUsers: IUserModel[]) => res.json(followerUsers))
    .catch((err: Error) => {
      const { message } = err;
      const status = statusError(err);

      res.status(status).json({ message });
    });
});

router.get('/users/:username/followings', publicPrivateAccessJwt, (req: Request, res: Response) => {
  const username = req.user;
  const targetUsername = req.params.username;

  logic
    .listUserFollowings(username, targetUsername)
    .then((followingUsers: IUserModel[]) => res.json(followingUsers))
    .catch((err: Error) => {
      const { message } = err;
      const status = statusError(err);

      res.status(status).json({ message });
    });
});

router.get('/users/:username/posts', publicPrivateAccessJwt, (req: Request, res: Response) => {
  const username = req.user;
  const targetUsername = req.params.username;

  logic
    .listUserPosts(username, targetUsername)
    .then((posts: IPostModel[]) => res.json(posts))
    .catch((err: Error) => {
      const { message } = err;
      const status = statusError(err);

      res.status(status).json({ message });
    });
});

router.get('/users/:username/saved', publicPrivateAccessJwt, (req: Request, res: Response) => {
  const username = req.user;
  const targetUsername = req.params.username;

  logic
    .listUserSavedPosts(username, targetUsername)
    .then((savedPosts: IPostModel[]) => res.json(savedPosts))
    .catch((err: Error) => {
      const { message } = err;
      const status = statusError(err);

      res.status(status).json({ message });
    });
});

router.get('/users/:username/stats', (req: Request, res: Response) => {
  const username = req.params.username;

  logic
    .retrieveUserStats(username)
    .then((stats: object) => res.json(stats))
    .catch((err: Error) => {
      const { message } = err;
      const status = statusError(err);

      res.status(status).json({ message });
    });
});

export default router;
