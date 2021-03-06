import { config } from 'dotenv';
import { Router, Response, Request } from 'express';
import logic from '../logic';
import { IPostModel } from '../models/post';
import { IUserModel } from '../models/user';
import statusError from './helpers/status-error';

config();

const router: Router = Router();

router.get('/search', (req: Request, res: Response) => {
  const {
    query: { q },
  } = req;

  logic
    .search(q)
    .then((users: IUserModel[]) => res.status(200).json(users))
    .catch((err: Error) => {
      const { message } = err;
      const status = statusError(err);

      res.status(status).json(message);
    });
});

export default router;
