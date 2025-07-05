import { Router } from 'express'
import userRouter from './user.route'

const router = Router()

const routes = [{ router: userRouter, path: '/user' }]

routes.forEach((route) => {
  router.use(route.path, route.router)
})

export default router
