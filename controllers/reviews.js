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

export const getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  })

  if (!review) {
    return next(new ErrorResponse(`No review found with the id of ${req.params.id}`, 404))
  }

  res.status(200).json({ success: true, data: review })
})

export const addReview = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId
  req.body.user = req.user.id

  const bootcamp = await Bootcamp.findById(req.params.bootcampId)

  if (!bootcamp) {
    return next(new ErrorResponse(`No bootcamp with the id of ${req.params.bootcampId}`, 404))
  }

  const review = await Review.create(req.body)

  res.status(201).json({ success: true, data: review })
})

export const updateReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id)

  if (!review) {
    return next(new ErrorResponse(`No review with the id of ${req.params.id}`, 404))
  }

  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized to update review', 401))
  }

  const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(201).json({ success: true, data: updatedReview })
})

export const deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id)

  if (!review) {
    return next(new ErrorResponse(`No review with the id of ${req.params.id}`, 404))
  }

  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized to update review', 401))
  }

  await Review.findByIdAndDelete(req.params.id)

  res.status(201).json({ success: true, data: {} })
})
