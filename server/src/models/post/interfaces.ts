import { Document, Types } from 'mongoose';
import { ILikeModel } from '../like';
import { ICommentModel } from '../comment';

export interface IPost {
  imageId: string;
  imageUrl: string;
  caption: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPostModel extends IPost, Document {
  user: Types.ObjectId;
  likes: ILikeModel[];
  comments: ICommentModel[];
}
