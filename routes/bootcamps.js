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
import Bootcamp from '../models/Bootcamp.js'
import { advancedResults } from '../middleware/advancedResults.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.use('/:bootcampId/courses', courseRouter)

router.route('/:id/photo').put(protect, bootcampPhotoUpload)

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, createBootcamp)

router.route('/:id').get(getBootcamp).put(protect, updateBootcamp).delete(protect, deleteBootcamp)

export default router
