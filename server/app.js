require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')

const port = process.env.PORT
const routes = require('./routes/index.js')

app.use(cors())

app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.use(routes)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})