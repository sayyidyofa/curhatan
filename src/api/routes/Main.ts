import { Request, Response, Router } from "express";
import { AuthService } from '../services/AuthService';
import ApiResponse from "../interfaces/ApiResponse";
import {AuthorizeToken} from "../middlewares/security/Authorize";
import {getCurrentUserCurhats, getCurrentUser, registerUser, removeCurrentUser, updateCurrentUser} from "../services/UserService";
import {RegisterValidation} from "../middlewares/validators/user/UserRegisterValidation";
import {UpdateValidation} from "../middlewares/validators/user/UserUpdateValidation";
import {addCurhat, deleteCurhat, getAllCurhats, updateCurhat} from "../services/CurhatService";
import {OwnsCurhat} from "../middlewares/security/OwnsCurhat";
import {CurhatValidation} from "../middlewares/validators/curhat/CurhatValidation";

const router = Router()

// Auth
router.post('/auth', AuthService)

// UserModel
router.post('/register', ...RegisterValidation, registerUser)
router.get('/me', AuthorizeToken, getCurrentUser)
router.get('/me/curhats', AuthorizeToken, getCurrentUserCurhats)
router.put('/me', AuthorizeToken, ...UpdateValidation, updateCurrentUser)
router.delete('/me', AuthorizeToken, removeCurrentUser)

// CurhatModel
router.get('/curhats', getAllCurhats)
router.post('/curhats', AuthorizeToken, ...CurhatValidation, addCurhat);
router.put('/curhats/:id', AuthorizeToken, OwnsCurhat, ...CurhatValidation, updateCurhat)
router.delete('/curhats/:id', AuthorizeToken, OwnsCurhat, deleteCurhat)


router.get('/', (req: Request, res: Response): void => {
    res.json(<ApiResponse>{
        success: true,
        message: 'CRUD curahan hati',
        error: null
    })
})

export default router
