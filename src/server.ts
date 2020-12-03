import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'
import Router from './api/routes/Main'
import {MONGODB_URL, SERVER_PORT} from "./constants";


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

server.listen(SERVER_PORT, () => {
  console.log(`Server has started at port ${SERVER_PORT}`)
})
