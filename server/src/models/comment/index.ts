import { model, Model } from "mongoose";
import CommentInterface from "./interface";
import CommentModelInterface from "./model-interface";
import commentSchema from "./schema";

const Comment: Model<CommentModelInterface> = model("Comment", commentSchema);

export default Comment;
export { CommentInterface, CommentModelInterface, commentSchema };
