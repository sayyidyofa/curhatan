import { Request, Response } from 'express';
import CurhatModel from "../../models/Curhat";
import ApiResponse from "../interfaces/ApiResponse";
import {sendPanic} from "../util/helpers";

export function getAllCurhats(req: Request, res: Response): void {
    CurhatModel.find().then(curhats => {
        res.json(<ApiResponse>{
            success: true,
            message: curhats,
            error: null
        })
    }).catch(reason => sendPanic(reason, res))
}

export function addCurhat(req: Request, res:Response): void {
    new CurhatModel({user: req.body.user.id, content: req.body.content})
        .save()
        .then(curhat => {
            res.json(<ApiResponse>{
                success: true,
                message: curhat._id,
                error: null
            })
        })
        .catch(reason => sendPanic(reason, res))
}

export function updateCurhat(req: Request, res: Response): void {
    CurhatModel.findByIdAndUpdate(req.params.id, {content: req.body.content})
        .then(curhat => {
            if (curhat === null) {
                res.json(<ApiResponse>{
                    success: false,
                    message: '',
                    error: `Curhat with id ${req.params.id} not found`
                })
            } else {
                res.json(<ApiResponse>{
                    success: true,
                    message: curhat._id,
                    error: null
                })
            }
        })
        .catch(reason => sendPanic(reason, res))
}

export function deleteCurhat(req: Request, res: Response): void {
    CurhatModel.findByIdAndDelete(req.params.id, (_, curhatDoc) => {
        if (curhatDoc === null) {
            res.json(<ApiResponse>{
                success: false,
                message: '',
                error: `Curhat with id ${req.params.id} not found`
            })
        } else {
            res.json(<ApiResponse>{
                success: true,
                message: curhatDoc._id,
                error: null
            })
        }
    }).catch(reason => sendPanic(reason, res))
}
