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

  res.status(200).json({ success: true })
})
