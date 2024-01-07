import Bootcamp from '../models/Bootcamp.js'
import { ErrorResponse } from '../utils/errorResponse.js'
import { asyncHandler } from '../middleware/async.js'

export const register = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true })
})
