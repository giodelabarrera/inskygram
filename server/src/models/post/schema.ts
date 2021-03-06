import { Schema, SchemaOptions } from 'mongoose';
import { commentSchema } from '../comment';
import { likeSchema } from '../like';

const { Types: ObjectId } = Schema;

const options: SchemaOptions = { timestamps: true };

const postSchema: Schema = new Schema(
  {
    imageId: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
    },
    location: {
      type: String,
    },
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    likes: [likeSchema],
    comments: [commentSchema],
  },
  options
);

export default postSchema;
