import { InferSchemaType, model, Schema } from 'mongoose'
import { WithId } from '../../utils/types'

const Review = new Schema(
  {
    review: {
      type: String,
    },
    stars: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export type ReviewType = WithId<InferSchemaType<typeof Review>>

export const ReviewModel = model('reviews', Review)
