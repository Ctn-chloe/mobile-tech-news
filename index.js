const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const { ppid } = require('process')

const app = express()

const newspapers = [
  {
    name: 'techcrunch',
    address: "https://techcrunch.com/"
  },
  {
    name: 'adexchanger',
    address: 'https://www.adexchanger.com/'
  },
  {
    name: 'venturebeat',
    address: 'https://venturebeat.com/'
  },
  {
    name: 'exchangewire',
    address: 'https://www.exchangewire.com/'
  }
]

const articles = []

newspapers.forEach(newspaper => {
  axios.get(newspaper.address)
        .then(response => {
          const html = response.data
          const $ = cheerio.load(html)

          $('a:contains("mobile")', html).each(function () {
            const title = $(this).text()
            const url = $(this).attr('href')

            articles.push({
              title,
              url,
              source: newspaper.name
            })
          })
        })
})

app.get('/', (req, res) => {
  res.json('Welcome to my mobile tech news API')
})

app.get('/news', (req, res) => {
  res.json(articles)
})

app.get('/news/:newspaperId', async (req, res) => {
  const newspaperId = req.params.newspaperId

  const newspaperAddress = newspapers.filter(newspaper => newspaper.name === newspaperId)[0].address

  console.log(newspaperAddress)

  axios.get(newspaperAddress)
        .then(response => {
          const html = response.data
          const $ = cheerio.load(html)

          const specificArticles = []

          $('a:contains("mobile")', html).each(function () {
            const title = $(this).text()
            const url = $(this).attr('href')

            specificArticles.push({
              title,
              url,
              source: newspaperId
            })
          })
          res.json(specificArticles)
        }).catch(err => console.log(err))
})

app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`))
