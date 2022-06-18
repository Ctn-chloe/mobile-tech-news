const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const { ppid } = require('process')

const app = express()

app.get('/', (req, res) => {
  res.json('Welcome to my mobile tech news API')
})

app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`))
