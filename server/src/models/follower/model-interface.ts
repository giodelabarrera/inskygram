import { Document, Types } from "mongoose";
import FollowerInterface from "./interface";

/**
 *
 *
 * @interface FollowerInterface
 * @extends {FollowerInterface}
 * @extends {Document}
 */
interface FollowerModelInterface extends FollowerInterface, Document {
  user: Types.ObjectId;
}

export default FollowerModelInterface;
