import { Types, Document } from 'mongoose';

export interface IFollowing {
  createdAt: Date;
}

export interface IFollowingModel extends IFollowing, Document {
  user: Types.ObjectId;
}
