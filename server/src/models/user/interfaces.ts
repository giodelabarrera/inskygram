import { Document } from 'mongoose';
import { IFollowerModel } from '../follower';
import { IFollowingModel } from '../following';
import { ISavedPostModel } from '../saved-post';

export interface IUser {
  username: string;
  password: string;
  name: string;
  email: string;
  website: string;
  phoneNumber: string;
  gender: string;
  biography: string;
  imageId: string;
  imageUrl: string;
  privateAccount: boolean;
  lastLogin: Date;
  enable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserModel extends IUser, Document {
  followers: IFollowerModel[];
  followings: IFollowingModel[];
  savedPosts: ISavedPostModel[];
}
