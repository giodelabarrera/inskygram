import { Document, Types } from "mongoose";
import { CommentModelInterface } from "../comment";
import { LikeModelInterface } from "../like";
import { UserTagModelInterface } from "../user-tag";
import PostInterface from "./interface";

/**
 * Post Model
 *
 * @interface PostInterface
 * @extends {PostInterface}
 * @extends {Document}
 */
interface PostModelInterface extends PostInterface, Document {
  user: Types.ObjectId;
  likes: LikeModelInterface[];
  comments: CommentModelInterface[];
  userTags: UserTagModelInterface[];
}

export default PostModelInterface;
