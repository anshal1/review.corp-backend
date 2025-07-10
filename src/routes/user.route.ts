import { Router } from 'express'
import {
  handleGetProfile,
  handleLogin,
  handleRegister,
  handleRegisterWithGoogle,
} from '../controllers/user.controller'
import { validateUserMiddleware } from '../utils/middleware'

const userRouter = Router()

userRouter.route('/register').post(handleRegister)
userRouter.route('/login').post(handleLogin)
userRouter.route('/google').post(handleRegisterWithGoogle)
userRouter.route('/profile').get(validateUserMiddleware, handleGetProfile)
userRouter.route('/profile/:id').get(handleGetPublicProfile)

export default userRouter
