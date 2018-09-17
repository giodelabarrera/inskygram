import { model, Model } from "mongoose";
import SavedPostInterface from "./model-interface";
import SavedPostModelInterface from "./model-interface";
import savedPostSchema from "./schema";

const SavedPost: Model<SavedPostModelInterface> = model("SavedPost", savedPostSchema);

export default SavedPost;
export { SavedPostInterface, SavedPostModelInterface, savedPostSchema };
