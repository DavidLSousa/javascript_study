import express from 'express'
import { router } from './router.js'
import dotenv from 'dotenv'
dotenv.config()

export const app = express()

app.use(express.json())
app.use(router)

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5503')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  next()
})
