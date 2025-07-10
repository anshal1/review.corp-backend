import { decryptText, TError, TryCatch } from '.'
import { ReviewModel } from '../db/schema/review.schema'
import { UserModel } from '../db/schema/user.schema'

export const validateUserMiddleware = TryCatch(async (req, res, next) => {
  const token = req.headers.authorization
  if (!token) return TError('Please login to continue', 401)
  const userId = decryptText(token)
  const user = await UserModel.findOne({ _id: userId }).lean()
  if (!user) return TError('User not found', 404)
  req.user = user
  next()
})

export const validDateSubscription = TryCatch(async (req, res, next) => {
  const user = req.user!
  const userReviewsCount = await ReviewModel.countDocuments({ userId: user._id })
  if (userReviewsCount >= 5 && !user.isSubscribed)
    return TError('Please subscribe to continue', 401)
  next()
})
