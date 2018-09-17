import { Document, Types } from "mongoose";
import FollowingInterface from "./interface";

/**
 *
 *
 * @interface FollowingInterface
 * @extends {FollowingInterface}
 * @extends {Document}
 */
interface FollowingModelInterface extends FollowingInterface, Document {
  user: Types.ObjectId;
}

export default FollowingModelInterface;
