import { InferSchemaType, model, Schema } from 'mongoose'
import { WithId } from '../../utils/types'

const ReviewLink = new Schema(
  {
    link: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  { timestamps: true },
)

export type ReviewLinkType = WithId<InferSchemaType<typeof ReviewLink>>

export const ReviewLinkModel = model('links', ReviewLink)
