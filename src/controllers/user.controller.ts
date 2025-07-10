import { User, UserModel } from '../db/schema/user.schema'
import {
  checkFields,
  comparePassword,
  encryptPassword,
  encryptText,
  isSelectedSericesvalid,
  isValidEmail,
  TError,
  TryCatch,
} from '../utils'
import { COOKIE_OPTIONS, TYPES } from '../utils/constant'
import { GoogleTokenResponse, GoogleUser } from '../utils/types'

const handleRegister = TryCatch(async (req, res) => {
  const body = req.body as User
  checkFields(body)
  if (body.email) {
    if (!isValidEmail(body.email)) return TError('Invalid Email', 400)
  }

  if (!TYPES.includes(body.type)) return TError('Invalid Type', 400)

  if (body.type === 'Organization' && !body.address)
    return TError('Address is required for organizations', 400)

  const userExists = await UserModel.findOne({ email: body.email }).lean()
  if (userExists) return TError('User already exists', 400)
  const hashPassword = encryptPassword(body.password)
  body.password = hashPassword
  const verificationHash = encryptText(body.email)
  // TODO send verification email
  const userCreated = await UserModel.create({ ...body, verificationHash })
  const cookie = encryptText(userCreated._id.toString())
  res.cookie('token', cookie, COOKIE_OPTIONS).json({ message: 'Regstration successful' })
})

const handleRegisterWithGoogle = TryCatch(async (req, res) => {
  const code = req.query.code as string
  const redirectURL = req.query.redirect as string
  if (!code) return TError('Something Went Wrong', 500)
  const data = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code: code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: redirectURL ?? process.env.GOOGLE_REDIRECT_URI!,
      grant_type: 'authorization_code',
    }),
  })
  const tokenData = (await data.json()) as GoogleTokenResponse
  if (!data.ok) return TError('Something went wrong during login', 500)
  const { access_token } = tokenData
  const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })

  const userData = (await userRes.json()) as GoogleUser
  if (!userRes.ok) return TError('User not found', 404)
  const userExits = await UserModel.findOne({ email: userData.email }).lean()
  if (userExits) {
    const token = encryptText(userExits._id.toString())
    return res.cookie('token', token, COOKIE_OPTIONS).json({ message: 'Login SuccessFull' })
  }
  const newUser = await UserModel.create({
    email: userData.email,
    name: userData.name,
    type: 'Individual',
    verified: true,
    password: 'google',
  })
  const token = encryptText(newUser._id.toString())
  res.cookie('token', token, COOKIE_OPTIONS).json({ message: 'Registration successfull' })
  //   cookie saving test
})

const handleLogin = TryCatch(async (req, res) => {
  const body = req.body as User
  if (body.password === 'google') return TError('User not found', 404)
  if (!body.email || !body.password) return TError('Email and Password are required', 400)
  const user = await UserModel.findOne({ email: body.email }).lean()
  if (!user) return TError('User not found', 404)
  if (!comparePassword(body.password, user.password)) return TError('Incorrect Password', 400)
  const cookie = encryptText(user._id.toString())
  res.cookie('token', cookie, COOKIE_OPTIONS).json({ message: 'Login successful' })
})

const handleVerify = TryCatch(async (req, res) => {
  const hash = req.params.hash as string
  const user = await UserModel.findOne({ verificationHash: hash }).lean()
  if (!user) return TError('User not found', 404)
  await UserModel.updateOne({ _id: user._id }, { verified: true, verificationHash: null })
  res.json({ message: 'Verification successful' })
})

const handleUpdateProfile = TryCatch(async (req, res) => {
  if (!req.user) return TError('User not found', 404)
  const body = req.body as User
  if (body.services && !(await isSelectedSericesvalid(body.services)))
    return TError('Invalid Services', 400)
  if (body.type === 'Organization' && !body.address)
    return TError('Address is required for organizations', 400)
  const user = await UserModel.findOne({ _id: req.user._id }).lean()
  if (!user) return TError('User not found', 404)
  const updatedUser = await UserModel.updateOne(
    { _id: user._id },
    { ...body },
    { new: true },
  ).lean()
  res.json({ message: 'Profile updated successfully', user: updatedUser })
})

const handleGetPublicProfile = TryCatch(async (req, res) => {
  const userId = req.params.id
  const user = await UserModel.findOne({ _id: userId })
    .select('-password -stripeCustomerId -subscriptionID -isSubscribed')
    .lean()
  if (!user) return TError('User not found', 404)
  res.json({ user })
})

const handleGetProfile = TryCatch(async (req, res) => {
  if (!req.user) return TError('User not found', 404)
  const user = {
    ...req.user,
    password: null,
  }
  res.json({ user })
})

export {
  handleRegister,
  handleLogin,
  handleRegisterWithGoogle,
  handleVerify,
  handleUpdateProfile,
  handleGetPublicProfile,
  handleGetProfile,
}
