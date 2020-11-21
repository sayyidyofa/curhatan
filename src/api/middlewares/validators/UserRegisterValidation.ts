import {ValidationChain} from "express-validator/src/chain/validation-chain";
import {body} from "express-validator";

export const RegisterValidation : Array<ValidationChain> = [
    body('username').isLength({ min: 4, max: 20 }),
    body('password').isLength({ min: 8, max: 20 })
]
