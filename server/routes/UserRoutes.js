import express from 'express'
import {signup, login, logout, protect, forgotPasswordTokenGenerator, resetPassword} from "../controllers/AuthControllers.js"
import { getOwnUserInfo } from '../controllers/UserControllers.js'
import { MailSender} from '../controllers/MailControllers.js'

const UserRouter = express.Router()

UserRouter
    .route('/signup')
    .post(signup)
UserRouter
    .route('/login')
    .post(login)
UserRouter
    .route('/logout')
    .post(logout)
UserRouter
    .route("/getUserInfo")
    .get(protect, getOwnUserInfo)
    
UserRouter
    .route("/forgotpassword")
    .post(forgotPasswordTokenGenerator, MailSender)

UserRouter
    .route(`/resetPassword/:resetToken`)
    .post(resetPassword)
export {UserRouter}