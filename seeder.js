import fs from 'fs'
import mongoose from 'mongoose'
import colors from 'colors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import Bootcamp from './models/Bootcamp.js'
import Course from './models/Course.js'
import User from './models/User.js'

dotenv.config({ path: './config/config.env' })

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

mongoose.connect(process.env.MONGO_URI)

const bootcamps = JSON.parse(
  fs.readFileSync(resolve(__dirname, '_data', 'bootcamps.json'), 'utf-8')
)

const courses = JSON.parse(fs.readFileSync(resolve(__dirname, '_data', 'courses.json'), 'utf-8'))
const users = JSON.parse(fs.readFileSync(resolve(__dirname, '_data', 'users.json'), 'utf-8'))

const importData = async () => {
  try {
    await Bootcamp.create(bootcamps)
    await Course.create(courses)
    await User.create(users)

    console.log('Data imported...'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(error)
  }
}

const deleteData = async () => {
  try {
    await Bootcamp.deleteMany()
    await Course.deleteMany()
    await User.deleteMany()

    console.log('Data deleted...'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(error)
  }
}

if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}
