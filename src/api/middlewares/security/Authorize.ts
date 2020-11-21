import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { JWT_KEY } from "../../../constants";
import ApiResponse from "../../interfaces/ApiResponse";
import AuthorizedUser from "../../interfaces/security/AuthorizedUser";


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
    req.body.user = (<AuthorizedUser>jwt.verify(authorizationHeader.substr(7), JWT_KEY)).user
    next()
  } catch (err) {
    res.json(tokenInvalidReponse)

    return
  }
}

