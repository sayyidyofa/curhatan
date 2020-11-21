import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { JWT_KEY } from "../../../constants";
import ApiResponse from "../../interfaces/ApiResponse";


const tokenInvalidReponse = <ApiResponse>{
  success: false,
  message: 'Token invalid',
  error: 'JWT token invalid'
}

export function AuthorizeToken(req: Request, res: Response, next: NextFunction): void {
  let authorizationHeader = req.headers['authorization']

  if (authorizationHeader === undefined) {
    res.json(tokenInvalidReponse)

    return
  }

  try {
    req.body.user = jwt.verify(authorizationHeader.substr(7), JWT_KEY)
    console.log(req.body)
    next()
  } catch (err) {
    res.json(tokenInvalidReponse)

    return
  }
}

