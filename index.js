const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const config = require('./config/key')
const { User } = require('./models/User')

// application/x-www-form-urlencoded 데이터 분석해서 가져옴 -
app.use(bodyParser.urlencoded({ extended: true }))

// application/json 데이터 분석해서 가져옴
app.use(bodyParser.json())

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World Anna!'))

app.post('/register', (req, res) => {

  // If you get the information you need when you sign up from client,
  // You push it into the database.

  const user = new User(req.body) //req.body 안에는 json 형식으로 client의 정보가 들어있음
    
  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err})
    return res.status(200).json({ success: true })
  })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


