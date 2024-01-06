import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { connectDB } from './config/db.js'
import { errorHandler } from './middleware/error.js'
import bootcamps from './routes/bootcamps.js'
import courses from './routes/courses.js'

dotenv.config({ path: './config/config.env' })

connectDB()

const app = express()

app.use(express.json())

app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)

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
