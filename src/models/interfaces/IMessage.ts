import { Document } from "mongoose";
import IUser from "./IUser";

export default interface IMessage extends Document {
    sender: IUser["_id"],
    receiver: IUser["_id"],
    content: string
}
