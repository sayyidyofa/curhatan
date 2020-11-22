import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import ApiResponse from "../../../interfaces/ApiResponse";


export const CurhatValidation = [
    [
        check("content", "Please provide the content").isLength({min: 1, max: 254})
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
