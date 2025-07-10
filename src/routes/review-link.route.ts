import { Router } from 'express'
import { validateUserMiddleware, validDateSubscription } from '../utils/middleware'
import { handleCreateLink, handleGetLinks } from '../controllers/review-link.controller'

const linkRouter = Router()

linkRouter
  .route('/')
  .post(validateUserMiddleware, validDateSubscription, handleCreateLink)
  .get(validateUserMiddleware, handleGetLinks)

export default linkRouter
