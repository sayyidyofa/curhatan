import { Request, Response } from 'express';
import UserModel from "../../models/User";
import ApiResponse from "../interfaces/ApiResponse";

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
    }).catch(console.warn)
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
        .catch(console.warn)
}

export function updateCurrentUser(req: Request, res: Response): void {
    let updateQuery = req.body.password
        ? {username: req.body.username, password: req.body.password}
        : {username: req.body.username}

    UserModel.findByIdAndUpdate(req.body.user.id, updateQuery)
        .then(user => {
            if (user !== null) {
                res.json(<ApiResponse>{
                    success: true,
                    message: user._id,
                    error: null
                })
            }
        })
        .catch(console.warn)
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
        .catch(console.warn)
}
