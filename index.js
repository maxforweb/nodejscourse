import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'

import todoRouter from './routes/todoRouter.js'

const DB_URL = `mongodb+srv://${process.env.DB_MONGO_USERNAME}:${process.env.DB_MONGO_PASSWORD}@cluster0.j5y5h.mongodb.net/?retryWrites=true&w=majority`
const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())

app.use('/', todoRouter)

async function startApp() {
  try {
    await mongoose.connect(
      DB_URL,
      { useUnifiedTopology: true, useNewUrlParser: true }
    )
    app.listen(PORT, () => console.log(`Server started on ${PORT} port`))
  } catch(e) {
    console.log(e)
  }
}

startApp()
