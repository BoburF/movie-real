const mongoose = require('mongoose')
const URi = process.env.DATA_BASE

mongoose.connect(URi, ()=>{
    console.log('BASA working on', URi);
})