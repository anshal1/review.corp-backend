import { TError, TryCatch } from '../utils'
import { GoogleTokenResponse, GoogleUser } from '../utils/types'

const handleRegister = TryCatch(async (_, res) => {
  const user = {
    name: 'user',
    id: 123,
  }
  //   cookie saving test
  res
    .cookie('token', user.id, {
      path: '/',
      secure: true,
      sameSite: 'none',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    })
    .json({ message: 'Registration SuccessFull' })
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

  const _userData = (await userRes.json()) as GoogleUser
  if (!userRes.ok) return TError('User not found', 404)
  // Find user in the db to check if the user already exists or not
  const user = {
    name: 'user',
    id: 200,
  }
  //   cookie saving test
  res
    .cookie('token', user.id, {
      path: '/',
      secure: true,
      sameSite: 'none',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    })
    .json({ message: 'Registration SuccessFull' })
})

const handleLogin = TryCatch(async (req, res) => {
  const token = req.headers.authorization
  res.json({ token })
})

export { handleRegister, handleLogin, handleRegisterWithGoogle }
