import { NextFunction, Request, Response } from "express";
import CurhatModel from "../../../models/Curhat";
import ApiResponse from "../../interfaces/ApiResponse";

export function OwnsCurhat(req: Request, res: Response, next: NextFunction) {
    const user = req.body.user;

    CurhatModel.findById(req.params.id, (_, curhat) => {
        if (curhat === null) {
            res.json(<ApiResponse>{
                success: false,
                message: '',
                error: `Curhat not found`
            })
            return
        } else {
            if (curhat.user.toString() === user.id) {
                next()
            } else {
                res.json(<ApiResponse>{
                    success: false,
                    message: '',
                    error: `Curhat is not owned by user`
                })
                return
            }
        }
    })
}
