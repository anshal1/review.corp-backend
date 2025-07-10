import { ReviewLinkModel } from '../db/schema/review-link.schema'
import { ReviewModel, ReviewType } from '../db/schema/review.schema'
import { UserModel } from '../db/schema/user.schema'
import { decryptText, TError, TryCatch } from '../utils'
import { FREE_REVIEWS } from '../utils/constant'

export const handleAddReview = TryCatch(async (req, res) => {
  if (req.user) return res.status(302).redirect(`${process.env.FRONTEND_URL}/dashboard`)
  const link = req.params.link as string
  const body = req.body as ReviewType
  const linkExists = await ReviewLinkModel.findOne({ link }).lean()
  if (!linkExists) return TError('Link not found', 404)
  const user = await UserModel.findOne({ _id: linkExists.user })
  if (!user) return TError(`This User/Organization no longer exist in our database`, 404)
  if (user.noOfReview >= FREE_REVIEWS && !user.isSubscribed)
    return TError('You currently cannot add a review for this user/organization', 400)
  const verify = decryptText(link)
  if (!verify) return TError('Link not found', 404)
  const createReview = await ReviewModel.create({
    ...body,
    userId: linkExists.user,
  })
  if (createReview._id) {
    user.noOfReview = user.noOfReview + 1
    await user.save()
    await ReviewLinkModel.deleteOne({ link })
    return res.json({ message: 'Review added successfully' })
  }
  return TError('Something went wrong', 500)
})

export const handleGetReviews = TryCatch(async (req, res) => {
  const user = req.user!
  const page = Number(req.query.page)
  const [reviews, isNextPage] = await Promise.all([
    await ReviewModel.find({ user: user._id })
      .limit(10)
      .skip(10 * (page - 1))
      .lean(),
    await ReviewModel.find()
      .limit(1)
      .skip(10 * page)
      .lean(),
  ])
  res.json({ reviews, isNextPage: isNextPage.length > 0 })
})
export const handleGetReviewForPublic = TryCatch(async (req, res) => {
  const page = Number(req.query.page)
  const userId = req.params.id
  const [reviews, isNextPage] = await Promise.all([
    await ReviewModel.find({ user: userId })
      .limit(10)
      .skip(10 * (page - 1))
      .lean(),
    await ReviewModel.find()
      .limit(1)
      .skip(10 * page)
      .lean(),
  ])
  res.json({ reviews, isNextPage: isNextPage.length > 0 })
})
