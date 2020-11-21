import { Request, Response } from 'express';
import UserModel from "../../models/User";
import ApiResponse from "../interfaces/ApiResponse";
import {sendPanic} from "../util/helpers";

const usernameUnique: ApiResponse = {
    success: false,
    message: '',
    error: 'Username must not be the same as the previous username'
}

export function getCurrentUser(req: Request, res: Response): void {
    const user = req.body.user;
    UserModel.findById(user.id, (_, user) => {
        if (user !== null) {
            res.json(<ApiResponse>{
                success: true,
                message: user,
                error: null
            })
        }
    }).catch(reason => sendPanic(reason, res))
}

export function registerUser(req: Request, res: Response): void {
    new UserModel({username: req.body.username, password: req.body.password})
        .save()
        .then(() => {
            res.json(<ApiResponse>{
                success: true,
                message: 'User successfully created',
                error: null
            })
        })
        .catch(reason => sendPanic(reason, res))
}

export function updateCurrentUser(req: Request, res: Response): void {

    UserModel.findById(req.body.user.id)
        .then(user => {
            if (user !== null) {
                if (req.body.username) {
                    req.body.username === user.username
                        ? res.json(usernameUnique)
                        : user.username = req.body.username;
                } else {
                    user.password = req.body.password ?? user.password
                    user.save()
                        .then(user => {
                            res.json(<ApiResponse>{
                                success: true,
                                message: user._id,
                                error: null
                            })
                        })
                }
            }
        })
        .catch(reason => sendPanic(reason, res))
}

export function removeCurrentUser(req: Request, res: Response): void {
    UserModel.findByIdAndDelete(req.body.user.id, (_, user) => {
        if (user !== null) {
            res.json(<ApiResponse>{
                success: true,
                message: user._id,
                error: null
            })
        }
    })
}

export function getCurrentUserCurhats(req: Request, res: Response): void {
    UserModel.findById(req.body.user.id)
        .populate('curhats')
        .exec((_, user) => {
            res.json(<ApiResponse>{
                success: true,
                message: user?.curhats,
                error: null
            })
        })
        .catch(reason => sendPanic(reason, res))
}
