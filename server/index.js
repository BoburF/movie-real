const express = require('express')
const app = express()
const cors = require('cors')


//config
require('dotenv').config()

//uses
app.use(cors({credentials: true, origin: process.env.FRONTEND_URL.split(' ')}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// base
require('./helper/dataBase')

//connect routes
app.use('/movies', require('./routes/client/index'))
app.use('/admin/movies', require('./routes/admin/admin'))

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log('Server working on', PORT);
})