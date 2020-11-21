import BCrypt from 'bcrypt';
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { JWT_KEY } from "../../constants";
import ApiResponse from "../interfaces/ApiResponse";
import UserModel from '../../models/User';
import SignedToken from "../interfaces/security/SignedToken";

/**
 * Response when authentication error.
 */
const authError = <ApiResponse>{
  success: false,
  message: 'Nama pengguna atau kata sandi tidak cocok',
  error: 'Username or password not match'
}

/**
 * Authenticate user function. This function will send response that
 * contain a JWT token.
 *
 * @param req Request
 * @param res Response
 */
export function AuthService(req: Request, res: Response): void {
  UserModel.findOne({email: req.body.email}).then(user => {
    if (user === null) {
      res.json(authError)
      return
    }

    BCrypt.compare(req.body.password, user.password).then(isValid => {
      if (isValid) {
        res.json(<ApiResponse>{
          success: true,
          message: <SignedToken>{
            token: jwt.sign({ user: { id: user.id } }, JWT_KEY, <jwt.SignOptions>{
              expiresIn: 86400 // expire in 24 hours
            })
          },
          error: null
        })
      } else {
        res.json(authError)
      }
    })
  })
  .catch(reason => {
    console.warn(reason)

    res.json(<ApiResponse>{
      success: false,
      message: 'An error ocurred',
      error: reason
    })
  })
}
