import { Model, model } from 'mongoose';
import { IComment, ICommentModel } from './interfaces';
import commentSchema from './schema';

const Comment: Model<ICommentModel> = model('Comment', commentSchema);

export default Comment;
export { IComment, ICommentModel, commentSchema };
