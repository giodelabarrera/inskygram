import { Document, Types } from "mongoose";
import CommentInterface from "./interface";

/**
 *
 *
 * @interface CommentInterface
 * @extends {CommentInterface}
 * @extends {Document}
 */
interface CommentModelInterface extends CommentInterface, Document {
  user: Types.ObjectId;
}

export default CommentModelInterface;
