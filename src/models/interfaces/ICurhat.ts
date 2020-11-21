import { Document } from "mongoose";
import IUser from "./IUser";

export default interface ICurhat extends Document {
    user: IUser["_id"],
    content: string
}