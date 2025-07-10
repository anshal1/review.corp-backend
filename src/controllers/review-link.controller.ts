import { ReviewLinkModel } from '../db/schema/review-link.schema'
import { encryptText, TError, TryCatch } from '../utils'
import { LIMIT } from '../utils/constant'

export const handleCreateLink = TryCatch(async (req, res) => {
  const user = req.user!
  const uniqueURL = encryptText(`${user._id.toString()}-${Date.now()}`)
  const newURL = await ReviewLinkModel.create({
    user: user._id,
    link: `${process.env.FRONTEND_URL}/add-review/${uniqueURL}`,
  })
  if (newURL.link) return res.json({ link: newURL.link })
  return TError('Something went wrong', 500)
})

export const handleGetLinks = TryCatch(async (req, res) => {
  const user = req.user!
  const page = Number(req.query.page)
  const [reviewLinks, isNextPage] = await Promise.all([
    await ReviewLinkModel.find({ user: user._id })
      .limit(LIMIT)
      .skip(LIMIT * (page - 1))
      .lean(),
    await ReviewLinkModel.find({ user: user._id })
      .limit(1)
      .skip(LIMIT * page)
      .lean(),
  ])
  res.json({ links: reviewLinks, isNextPage: isNextPage.length > 0 })
})
