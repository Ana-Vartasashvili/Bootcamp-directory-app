import express from 'express'
import { getReviews } from '../controllers/reviews.js'
import Review from '../models/Review.js'
import { advancedResults } from '../middleware/advancedResults.js'
import { protect, authorize } from '../middleware/auth.js'

const router = express.Router({ mergeParams: true })

router.route('/').get(
  advancedResults(Review, {
    path: 'bootcamp',
    select: 'name description',
  }),
  getReviews
)

export default router
