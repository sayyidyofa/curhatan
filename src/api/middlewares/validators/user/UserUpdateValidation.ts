import {check, validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";
import ApiResponse from "../../../interfaces/ApiResponse";

export const UpdateValidation = [
    [
        check("username", "Please provide a username").optional({ checkFalsy: true }),
        check("password", "Please provide a password").optional({ checkFalsy: true })
    ],
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json(<ApiResponse>{
                success: false,
                message: '',
                error: errors
            })
            return;
        } else {
            next()
        }
    }
]
