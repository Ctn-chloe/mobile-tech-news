const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const { ppid } = require('process')

const app = express()

const articles = []

app.get('/', (req, res) => {
  res.json('Welcome to my mobile tech news API')
})

app.get('/news', (req, res) => {
  axios.get('https://techcrunch.com/')
       .then((response) => {
         const html = response.data
         const $ = cheerio.load(html)

         $('a:contains("mobile")', html).each(function () {
           const title = $(this).text()
           const url = $(this).attr('href')
            articles.push({
              title,
              url
            })
          })
         res.json(articles)
  }).catch((err) => console.log(err))
})
app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`))
