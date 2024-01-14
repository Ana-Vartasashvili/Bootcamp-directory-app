import express from 'express'
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  updateUserDetails,
  updatePassword,
} from '../controllers/auth.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/updateDetails').put(protect, updateUserDetails)
router.route('/forgotPassword').post(forgotPassword)
router.route('/resetPassword/:resetToken').put(resetPassword)
router.route('/updatePassword').put(protect, updatePassword)

export default router
