import { asyncHandler } from '../middleware/async.js'
import { ErrorResponse } from '../utils/errorResponse.js'
import Bootcamp from '../models/Bootcamp.js'
import Review from '../models/Review.js'

export const getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({ bootcamp: req.params.bootcampId })

    res.status(200).json({ success: true, count: reviews.length, data: reviews })
  } else {
    res.status(200).json(res.advancedResults)
  }
})
