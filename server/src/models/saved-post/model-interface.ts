import { Document, Types } from "mongoose";
import SavedPostInterface from "./interface";

/**
 *
 *
 * @interface SavedPostInterface
 * @extends {SavedPostInterface}
 * @extends {Document}
 */
interface SavedPostModelInterface extends SavedPostInterface, Document {
  post: Types.ObjectId;
}

export default SavedPostModelInterface;
