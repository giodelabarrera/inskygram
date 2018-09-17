import { Document, Types } from "mongoose";
import UserTagInterface from "./interface";

/**
 *
 *
 * @interface UserTagInterface
 * @extends {UserTagInterface}
 * @extends {Document}
 */
interface UserTagModelInterface extends UserTagInterface, Document {
  user: Types.ObjectId;
}

export default UserTagModelInterface;
