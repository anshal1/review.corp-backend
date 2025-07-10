import { Router } from 'express'
import userRouter from './user.route'
import linkRouter from './review-link.route'
import reviewRouter from './review.route'

const router = Router()

const routes = [
  { router: userRouter, path: '/user' },
  { router: linkRouter, path: '/link' },
  { router: reviewRouter, path: '/review' },
]

routes.forEach((route) => {
  router.use(route.path, route.router)
})

export default router
