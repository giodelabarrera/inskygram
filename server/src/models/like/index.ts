import { model, Model } from "mongoose";
import LikeInterface from "./interface";
import LikeModelInterface from "./model-interface";
import likeSchema from "./schema";

const Like: Model<LikeModelInterface> = model("Like", likeSchema);

export default Like;
export { LikeInterface, LikeModelInterface, likeSchema };
