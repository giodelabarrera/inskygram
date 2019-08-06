import { Schema, SchemaOptions } from 'mongoose';
import { followerSchema } from '../follower';
import { followingSchema } from '../following';
import { savedPostSchema } from '../saved-post';

const options: SchemaOptions = { timestamps: true };

const userSchema: Schema = new Schema(
  {
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
    },
    website: String,
    phoneNumber: {
      type: String,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
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
  },
  options
);

// userSchema.plugin(uniqueValidator, { message: `user with {PATH} {VALUE} already exists` });

export default userSchema;
