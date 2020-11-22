import { Request, Response } from 'express';
import UserModel from "../../models/User";
import ApiResponse from "../interfaces/ApiResponse";
import {sendPanic} from "../util/helpers";
import BCrypt from 'bcrypt';

const usernameUnique: ApiResponse = {
    success: false,
    message: '',
    error: 'Username already exists, dont post previous username or other user\'s username'
}

function encryptPassword(password: string): string {
    const salt = BCrypt.genSaltSync(10);
    return BCrypt.hashSync(password, salt)
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
    new UserModel({username: req.body.username, password: encryptPassword(req.body.password)})
        .save()
        .then(() => {
            res.json(<ApiResponse>{
                success: true,
                message: 'User successfully created',
                error: null
            })
        })
        .catch(reason => {
            // If user with said username already exists
            if (reason.code === 11000) {
                res.json(<ApiResponse>{
                    success: false,
                    message: '',
                    error: `User with username ${req.body.username} already exists`
                })
            } else sendPanic(reason, res)
        })
}

export function updateCurrentUser(req: Request, res: Response): void {
    let updateQuery = req.body.password
        ? {username: req.body.username, password: encryptPassword(req.body.password)}
        : {username: req.body.username};

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
        .catch(reason => {
            // If user with said username already exists
            if (reason.code === 11000) {
                res.json(usernameUnique)
            } else sendPanic(reason, res)
        })
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
        .exec((error, user) => {
            if (error) sendPanic(error, res)
            else res.json(<ApiResponse>{
                success: true,
                message: user?.curhats,
                error: null
            })
        })
        /*.catch()*/
}
