import { compareSync, genSaltSync, hashSync } from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import { sign, verify } from 'jsonwebtoken'
import { EMAIL_REGEX, serviceCategories } from './constant'

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.message = message
    this.status = status
  }
}

export function TError(error: string, status: number) {
  throw new ApiError(error, status)
}

export function TryCatch<T>(
  fn: (_req: Request, _res: Response, _next: NextFunction) => Promise<T>,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next)
  }
}

export function encryptText(plainText: string) {
  const secret = process.env.JWT_SECRET!
  const encrypted = sign(plainText, secret)
  return encrypted
}

export function decryptText(encryptedText: string) {
  const secret = process.env.JWT_SECRET!
  const decrypted = verify(encryptedText, secret)
  return decrypted
}

export function encryptPassword(password: string) {
  const salt = genSaltSync(10)
  const hash = hashSync(password, salt)
  return hash
}

export function comparePassword(password: string, hash: string) {
  return compareSync(password, hash)
}

export function checkFields(fields: Record<string, unknown>) {
  if (Object.keys(fields).length === 0) return TError('Fields are required', 400)
  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined || value === null || !value) {
      return TError(`Field ${key} is required`, 400)
    }
  }
}

export function isValidEmail(email: string) {
  const emailRegex = new RegExp(EMAIL_REGEX)
  return emailRegex.test(email)
}

export async function isSelectedSericesvalid(services: string[]): Promise<boolean> {
  return new Promise((resolve, reject) => {
    services.forEach((service) => {
      serviceCategories.forEach((category) => {
        if (!category.services.includes(service))
          reject(`${service} is not a valid service for ${category.category}`)
      })
    })
    resolve(true)
  })
}
