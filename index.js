import express from 'express'
import dotenv from 'dotenv'
import fileUpload from 'express-fileupload'
import colors from 'colors'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'
import cookieParser from 'cookie-parser'
import { connectDB } from './config/db.js'
import { errorHandler } from './middleware/error.js'
import bootcamps from './routes/bootcamps.js'
import courses from './routes/courses.js'
import auth from './routes/auth.js'
import users from './routes/users.js'
import reviews from './routes/reviews.js'

dotenv.config({ path: './config/config.env' })

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

connectDB()

const app = express()

app.use(express.json())

app.use(cookieParser())

app.use(fileUpload())
app.use(express.static(path.resolve(__dirname, 'public')))

app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', users)
app.use('/api/v1/reviews', reviews)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
)

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  server.close(() => process.exit(1))
})
