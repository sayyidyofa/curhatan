import {Response} from "express";
import ApiResponse from "../interfaces/ApiResponse";
import {NativeError} from "mongoose";

export function sendPanic(reason: PromiseRejectedResult | NativeError, res: Response): void {
    console.warn(reason)

    res.json(<ApiResponse>{
        success: false,
        message: 'An error occured',
        error: reason
    })
}
