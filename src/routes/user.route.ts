import { Router } from 'express'
import {
  handleLogin,
  handleRegister,
  handleRegisterWithGoogle,
} from '../controllers/user.controller'

const userRouter = Router()

userRouter.route('/register').post(handleRegister)
userRouter.route('/login').post(handleLogin)
userRouter.route('/google').post(handleRegisterWithGoogle)

export default userRouter
