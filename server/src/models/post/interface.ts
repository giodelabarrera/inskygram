/**
 *
 *
 * @interface PostInterface
 */
interface PostInterface {
  imageId: string;
  imageUrl: string;
  caption: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

export default PostInterface;
