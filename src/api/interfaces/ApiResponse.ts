import SignedToken from "./security/SignedToken";
import IUser from "../../models/interfaces/IUser";
import ICurhat from "../../models/interfaces/ICurhat";

export default interface ApiResponse {
  success: boolean,
  message: string | SignedToken | IUser | Array<IUser> | ICurhat | Array<ICurhat>,
  error: /*Array<string>*/ string | PromiseRejectedResult | null
}
