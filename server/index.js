const express = require('express')
const app = express()
const cors = require('cors')


//config
require('dotenv').config()

//uses
app.use(cors({credentials: true, origin: process.env.FRONTEND_URL}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// basa
require('./helper/dataBase')

// routes
const movies = require('./routes/client/index')

//connect routes
app.use('/movies', movies)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log('Server working on', PORT);
})