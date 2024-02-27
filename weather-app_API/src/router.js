import express from 'express'

export const router = express.Router()

router.get('/key', (req, res) => {

  const apikey = process.env.APIKEY

  return res.json({ apikey: apikey })
})
