import { model, Model } from "mongoose";
import NotificationInterface from "./interface";
import NotificationModelInterface from "./model-interface";
import notificationSchema from "./schema";

const Notification: Model<NotificationModelInterface> = model("Notification", notificationSchema);

export default Notification;
export { NotificationInterface, NotificationModelInterface, notificationSchema };
