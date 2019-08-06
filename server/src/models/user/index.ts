import { Model, model } from 'mongoose';
import { IUser, IUserModel } from './interfaces';
import userSchema from './schema';

const User: Model<IUserModel> = model<IUserModel>('User', userSchema);

export default User;
export { IUser, IUserModel, userSchema };
