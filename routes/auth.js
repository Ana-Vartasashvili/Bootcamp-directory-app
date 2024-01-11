import express from 'express'
import { register, login, forgotPassword } from '../controllers/auth.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/forgotPassword').post(forgotPassword)

export default router
