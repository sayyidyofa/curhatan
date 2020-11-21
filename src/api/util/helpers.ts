import {Response} from "express";
import ApiResponse from "../interfaces/ApiResponse";

export function sendPanic(reason: PromiseRejectedResult, res: Response): void {
    console.warn(reason)

    res.json(<ApiResponse>{
        success: false,
        message: '',
        error: reason
    })
}
