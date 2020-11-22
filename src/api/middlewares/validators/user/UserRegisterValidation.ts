import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import ApiResponse from "../../../interfaces/ApiResponse";

export const RegisterValidation = [
    [
        check("username", "Please provide a username").not().isEmpty(),
        check("password", "Please provide a password").not().isEmpty()
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
