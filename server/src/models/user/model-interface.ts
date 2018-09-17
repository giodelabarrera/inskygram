import { Document } from "mongoose";
import { FollowRequestModelInterface } from "../follow-request";
import { FollowerModelInterface } from "../follower";
import { FollowingModelInterface } from "../following";
import { NotificationModelInterface } from "../notification";
import { SavedPostModelInterface } from "../saved-post";
import UserInterface from "./interface";

/**
 *
 *
 * @interface UserModelInterface
 * @extends {UserInterface}
 * @extends {Document}
 */
interface UserModelInterface extends UserInterface, Document {
  followers: FollowerModelInterface[];
  followings: FollowingModelInterface[];
  savedPosts: SavedPostModelInterface[];
  notifications: NotificationModelInterface[];
  followRequests: FollowRequestModelInterface[];
}

export default UserModelInterface;
