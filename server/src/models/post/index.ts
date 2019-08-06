import { Model, model } from 'mongoose';
import { IPost, IPostModel } from './interfaces';
import postSchema from './schema';

const Post: Model<IPostModel> = model('Post', postSchema);

export default Post;
export { IPost, IPostModel, postSchema };
