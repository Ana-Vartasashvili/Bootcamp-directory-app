import express from 'express'
import {
  bootcampPhotoUpload,
  createBootcamp,
  deleteBootcamp,
  getBootcamp,
  getBootcamps,
  updateBootcamp,
} from '../controllers/bootcamps.js'
import courseRouter from './courses.js'

const router = express.Router()

router.use('/:bootcampId/courses', courseRouter)

router.route('/:id/photo').put(bootcampPhotoUpload)

router.route('/').get(getBootcamps).post(createBootcamp)

router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp)

export default router
