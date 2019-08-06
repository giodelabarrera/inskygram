import { Model, model } from 'mongoose';
import { ISavedPost, ISavedPostModel } from './interfaces';
import savedPostSchema from './schema';

const SavedPost: Model<ISavedPostModel> = model('SavedPost', savedPostSchema);

export default SavedPost;
export { ISavedPost, ISavedPostModel, savedPostSchema };
