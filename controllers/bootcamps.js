import path from 'path'
import Bootcamp from '../models/Bootcamp.js'
import { ErrorResponse } from '../utils/errorResponse.js'
import { asyncHandler } from '../middleware/async.js'

export const getBootcamps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

export const getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id)

  if (!bootcamp) {
    return new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
  }

  res.status(200).json({ success: true, data: bootcamp })
})

export const createBootcamp = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id

  const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id })

  if (publishedBootcamp && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`The user with ID ${req.user.id} has already published a bootcamp`, 400)
    )
  }

  const bootcamp = await Bootcamp.create(req.body)

  res.status(201).json({ success: true, data: bootcamp })
})

export const updateBootcamp = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findById(req.params.id)

  if (!bootcamp) {
    return new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
  }

  if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`User ${req.params.id} is not authorized to update this bootcamp`, 401)
    )
  }

  bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({ success: true, data: bootcamp })
})

export const deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id)

  if (!bootcamp) {
    return new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
  }

  if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`User ${req.params.id} is not authorized to delete this bootcamp`, 401)
    )
  }

  await bootcamp.deleteOne()

  res.status(200).json({ success: true, data: {} })
})

export const bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id)

  if (!bootcamp) {
    return new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
  }

  if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`User ${req.params.id} is not authorized to update this bootcamp`, 401)
    )
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400))
  }

  const file = req.files.file

  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400))
  }

  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 400)
    )
  }

  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.log(err)
      return next(new ErrorResponse(`Problem with file upload`, 500))
    }

    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name })

    res.status(200).json({ success: true, data: file.name })
  })
})
