import { Schema, SchemaOptions } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { followRequestSchema } from "../follow-request";
import { followerSchema } from "../follower";
import { followingSchema } from "../following";
import { notificationSchema } from "../notification";
import { savedPostSchema } from "../saved-post";
const validate: any = require("mongoose-validator");

const options: SchemaOptions = { timestamps: true };

const emailValidator = validate({
  validator: "isEmail",
  message: "This value is not a valid email address.",
});

const userSchema: Schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: emailValidator,
  },
  website: String,
  phoneNumber: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  biography: String,
  imageId: String,
  imageUrl: String,
  privateAccount: { type: Boolean, default: false },
  lastLogin: Date,
  enable: { type: Boolean, default: true },
  followers: [followerSchema],
  followings: [followingSchema],
  savedPosts: [savedPostSchema],
  notifications: [notificationSchema],
  followRequests: [followRequestSchema],
}, options);

userSchema.plugin(uniqueValidator, { message: `user with {PATH} {VALUE} already exists` });

export default userSchema;
