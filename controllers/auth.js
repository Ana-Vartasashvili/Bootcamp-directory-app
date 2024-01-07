import Bootcamp from '../models/Bootcamp.js'
import { ErrorResponse } from '../utils/errorResponse.js'
import { asyncHandler } from '../middleware/async.js'
import User from '../models/User.js'

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body

  const user = await User.create({
    name,
    email,
    password,
    role,
  })

  const token = user.getSignedJwtToken()

  res.status(200).json({ success: true, token })
})

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400))
  }

  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401))
  }

  const isMatch = await user.matchPassword(password)

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401))
  }

  res.status(200).json({ success: true })
})
