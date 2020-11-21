import {ValidationChain} from "express-validator/src/chain/validation-chain";
import {body} from "express-validator";

export const CurhatUpdateValidation : Array<ValidationChain> = [
    body('content').isLength({ min: 1, max: 254 })
]
