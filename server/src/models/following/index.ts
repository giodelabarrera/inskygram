import { Model, model } from 'mongoose';
import { IFollowing, IFollowingModel } from './interfaces';
import followingSchema from './schema';

const Following: Model<IFollowingModel> = model('Following', followingSchema);

export default Following;
export { IFollowing, IFollowingModel, followingSchema };
