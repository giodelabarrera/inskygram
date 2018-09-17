import { model, Model } from "mongoose";
import FollowerInterface from "./interface";
import FollowerModelInterface from "./model-interface";
import followerSchema from "./schema";

const Follower: Model<FollowerModelInterface> = model("Follower", followerSchema);

export default Follower;
export { FollowerInterface, FollowerModelInterface, followerSchema };
