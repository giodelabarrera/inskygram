import { Schema, SchemaOptions } from "mongoose";

const { Types: ObjectId } = Schema;

const options: SchemaOptions = { timestamps: true };

const commentSchema: Schema = new Schema({
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  description: { type: String, trim: true, required: true },
}, options);

export default commentSchema;
