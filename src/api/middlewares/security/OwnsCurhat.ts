import { NextFunction, Request, Response } from "express";
import UserModel from "../../../models/User";

export function OwnsCurhat(req: Request, res: Response, next: NextFunction) {
    const user = req.body.user;

    UserModel.findById(user.id).populate('curhats').exec((_, userWithCurhats) => {
        if (typeof userWithCurhats?.curhats?.length !== 'undefined') {
            if (userWithCurhats.curhats?.length < 1) {
                next()
            } else return;
        }
    }).catch()
}