import { model, Model } from "mongoose";
import FollowingInterface from "./interface";
import FollowingModelInterface from "./model-interface";
import followingSchema from "./schema";

const Following: Model<FollowingModelInterface> = model("Following", followingSchema);

export default Following;
export { FollowingInterface, FollowingModelInterface, followingSchema };
