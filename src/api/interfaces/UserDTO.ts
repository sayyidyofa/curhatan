import CurhatDTO from "./CurhatDTO";

export default interface UserDTO {
    username: string,
    curhats?: Array<CurhatDTO>
}
