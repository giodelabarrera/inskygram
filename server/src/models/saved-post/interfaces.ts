import { Document, Types } from 'mongoose';

export interface ISavedPost {
  createdAt: Date;
}

export interface ISavedPostModel extends ISavedPost, Document {
  post: Types.ObjectId;
}
