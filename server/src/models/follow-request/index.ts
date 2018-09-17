import { model, Model } from "mongoose";
import FollowRequestInterface from "./interface";
import FollowRequestModelInterface from "./model-interface";
import followRequestSchema from "./schema";

const FollowRequest: Model<FollowRequestModelInterface> = model("FollowRequest", followRequestSchema);

export default FollowRequest;
export { FollowRequestInterface, FollowRequestModelInterface, followRequestSchema };
