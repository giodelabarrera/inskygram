import { Schema } from "mongoose";

const { Types: ObjectId } = Schema;

const savedPostSchema: Schema = new Schema({
  post: {
    type: ObjectId,
    ref: "Post",
    required: true,
  },
  createdAt: { type: Date, default: Date.now, required: true },
});

export default savedPostSchema;
