import { model, Model } from "mongoose";
import PostInterface from "./interface";
import PostModelInterface from "./model-interface";
import postSchema from "./schema";

const Post: Model<PostModelInterface> = model("Post", postSchema);

export default Post;
export { PostInterface, PostModelInterface, postSchema };
