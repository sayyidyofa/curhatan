import {ValidationChain} from "express-validator/src/chain/validation-chain";
import {body} from "express-validator";

export const CurhatAddValidation : Array<ValidationChain> = [
    body('user').isString(),
    body('content').isLength({ min: 1, max: 254 })
]
