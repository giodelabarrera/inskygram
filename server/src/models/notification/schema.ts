import { Schema, SchemaOptions } from "mongoose";
import { followerSchema } from "../follower";

const { Types: ObjectId } = Schema;

const options: SchemaOptions = { timestamps: true };

const notificationSchema: Schema = new Schema({
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: ObjectId,
    ref: "Post",
  },
  type: {
    type: String,
    enum: ["like", "comment", "mention-comment", "user-tag", "follow", "follow-request"],
    required: true,
  },
  viewed: { type: Boolean, default: false },
  followRequest: followerSchema,
}, options);

export default notificationSchema;
