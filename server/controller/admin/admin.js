const AdminModel = require('../../model/admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    login: async (req, res) => {
        try {
            const {email, password} = req.body
            const admin = await AdminModel.findOne({email})
            if(!admin){
                return res.json("Email noto'g'ri")
            }

            const passwordTrue = await bcrypt.compare(password)

            if(passwordTrue){
                return res.json("Parol noto'g'ri")
            }

            const token = jwt.sign({email: admin.email}, process.env.SECRET_JWT_KEY)

            res.send({email: admin.email} ,token)
        } catch (error) {
            console.log(error.message);
            res.json('Xato chiqdi!')
        }
    },
    registr: async (req, res)=>{
        
    },
    activation: async(req, res) => {
        
    }
}