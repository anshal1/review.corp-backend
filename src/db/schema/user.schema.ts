import { InferSchemaType, model, Schema } from 'mongoose'
import { WithId } from '../../utils/types'

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      unique: true,
    },
    address: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationHash: {
      type: String,
      default: null,
    },
    noOfReview: {
      type: Number,
      default: 0,
    },
    bio: {
      type: String,
    },
    services: {
      type: [String],
    },
    isSubscribed: {
      type: Boolean,
      default: false,
    },
    subscriptionID: {
      type: String,
      default: null,
    },
    stripeCustomerId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
)

export type User = WithId<InferSchemaType<typeof UserSchema>>
export const UserModel = model('users', UserSchema)
