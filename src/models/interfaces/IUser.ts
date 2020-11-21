import { Document } from "mongoose"
import ICurhat from "./ICurhat";

export default interface IUser extends Document {
    username: string,
    password: string,
    curhats?: ICurhat["_id"][] | null
}
