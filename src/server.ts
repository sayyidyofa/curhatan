import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'
import process from 'process'
import Router from './api/routes/Main'

const PORT = process.env.PORT || 3000
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/curhatan'

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.log('Failed when connecting to MongoDB')
    console.warn(err)
  })

let server = express()

server.use(bodyParser.json())

server.use('/', Router)

server.listen(PORT, () => {
  console.log(`Server has started at port ${PORT}`)
})
