import { model, Model } from "mongoose";
import UserInterface from "./interface";
import UserModelInterface from "./model-interface";
import userSchema from "./schema";

const User: Model<UserModelInterface> = model("User", userSchema);

export default User;
export { UserInterface, UserModelInterface, userSchema };
