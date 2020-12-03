import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Router from './api/routes/Main'
import {MONGODB_URL, SERVER_PORT, SERVER_URL} from "./constants";


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

//options for cors midddleware
const options: cors.CorsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,PUT,POST,DELETE',
    origin: SERVER_URL,
    preflightContinue: false,
};

let server = express()

server.use(bodyParser.json())
server.use(cors(options))

server.options('*', cors(options))

server.use('/', Router)

server.listen(SERVER_PORT, () => {
  console.log(`Server has started at port ${SERVER_PORT}`)
})
