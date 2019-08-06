import { Document, Types } from 'mongoose';

export interface IComment {
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommentModel extends IComment, Document {
  user: Types.ObjectId;
}
