import { Router } from 'express'
import {
  handleAddReview,
  handleGetReviewForPublic,
  handleGetReviews,
} from '../controllers/review.controller'
import { validateUserMiddleware } from '../utils/middleware'

const reviewRouter = Router()

reviewRouter.route('/create').post(handleAddReview)
reviewRouter.route('/').get(validateUserMiddleware, handleGetReviews)
reviewRouter.route('/:id').get(handleGetReviewForPublic)

export default reviewRouter
