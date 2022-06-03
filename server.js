const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const { MongoClient } = require('mongodb')

require('dotenv').config()

const toDoRouters = require('./todo/todo.router')

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('combined'))

app.use(express.static('public'))

app.use('/todo', toDoRouters)

async function startServer() {
  try {
    const client = new MongoClient(process.env.MONGODB_URL)
    await client.connect()
    // old version
    // await mongoose.connect(process.env.MONGODB_URL, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useFindAndModify: false
    // })
    console.log('TODOs database connection successful!')

    app.listen(process.env.PORT, (err) => {
      if (err) throw err
      console.log('Your TODOs app is running on port: ' + process.env.PORT)
    })
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

startServer()
