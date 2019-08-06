import { Types, Document } from 'mongoose';

export interface ILike {
  createdAt: Date;
}

export interface ILikeModel extends ILike, Document {
  user: Types.ObjectId;
}
