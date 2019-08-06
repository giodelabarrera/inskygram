import { Types, Document } from 'mongoose';

export interface IFollower {
  createdAt: Date;
}

export interface IFollowerModel extends IFollower, Document {
  user: Types.ObjectId;
}
