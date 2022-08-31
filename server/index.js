const express = require('express')
const app = express()

//config
require('dotenv').config()

// basa
require('./helper/dataBase')


const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log('Server working on', PORT);
})