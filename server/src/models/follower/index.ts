import { Model, model } from 'mongoose';
import { IFollower, IFollowerModel } from './interfaces';
import followerSchema from './schema';

const Follower: Model<IFollowerModel> = model('Follower', followerSchema);

export default Follower;
export { IFollower, IFollowerModel, followerSchema };
