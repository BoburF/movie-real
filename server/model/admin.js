const { Schema, model } = require('mongoose')

const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    activationLink: {
        type: String,
        required: true
    }
})

module.exports = model('admins', adminSchema)