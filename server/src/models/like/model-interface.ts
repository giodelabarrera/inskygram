import { Document, Types } from "mongoose";
import LikeInterface from "./interface";

/**
 *
 *
 * @interface LikeInterface
 * @extends {LikeInterface}
 * @extends {Document}
 */
interface LikeModelInterface extends LikeInterface, Document {
  user: Types.ObjectId;
}

export default LikeModelInterface;
