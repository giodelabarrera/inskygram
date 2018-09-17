import { Schema } from "mongoose";

const { Types: ObjectId } = Schema;

const followerSchema: Schema = new Schema({
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now, required: true },
});

export default followerSchema;
