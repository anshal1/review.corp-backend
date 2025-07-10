import { Router } from 'express'
import {
  handleAddReview,
  handleGetReviewForPublic,
  handleGetReviews,
} from '../controllers/review.controller'

const reviewRouter = Router()

reviewRouter.route('/create').post(handleAddReview)
reviewRouter.route('/').get(handleGetReviews)
reviewRouter.route('/:id').get(handleGetReviewForPublic)

export default reviewRouter
