import { Model, model } from 'mongoose';
import { ILike, ILikeModel } from './interfaces';
import likeSchema from './schema';

const Like: Model<ILikeModel> = model('Like', likeSchema);

export default Like;
export { ILike, ILikeModel, likeSchema };
