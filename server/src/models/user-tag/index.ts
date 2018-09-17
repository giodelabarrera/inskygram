import { model, Model } from "mongoose";
import UserTagInterface from "./interface";
import UserTagModelInterface from "./model-interface";
import userTagSchema from "./schema";

const UserTag: Model<UserTagModelInterface> = model("UserTag", userTagSchema);

export default UserTag;
export { UserTagInterface, UserTagModelInterface, userTagSchema };
