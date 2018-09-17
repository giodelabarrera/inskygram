/**
 *
 *
 * @interface UserInterface
 */
interface UserInterface {
  username: string;
  password: string;
  name: string;
  email: string;
  website: string;
  phoneNumber: string;
  gender: string;
  biography: string;
  imageId: string;
  imageUrl: string;
  privateAccount: boolean;
  lastLogin: Date;
  enable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default UserInterface;
