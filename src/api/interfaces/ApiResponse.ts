import SignedToken from "./security/SignedToken";
import IUser from "../../models/interfaces/IUser";
import ICurhat from "../../models/interfaces/ICurhat";
import {Result, ValidationError} from "express-validator";

export default interface ApiResponse {
  success: boolean,
  message: string | SignedToken | IUser | Array<IUser> | ICurhat | Array<ICurhat>,
  error: /*Array<string>*/ string | PromiseRejectedResult | Result<ValidationError> | null
}
