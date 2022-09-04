const AdminModel = require('../../model/admin')
const bcrypt = require('bcrypt')
const adminService = require('../../services/adminService')
const uuid = require('uuid')
const sendMail = require('../../services/activateAdminLink')


module.exports = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const admin = await AdminModel.findOne({ email })
            if (!admin) {
                return res.json("Email noto'g'ri")
            }
            const passwordTrue = await bcrypt.compare(password, admin.password)
            console.log(passwordTrue);


            if (!passwordTrue) {
                return res.json("Parol noto'g'ri")
            }
            const token = await adminService.tokenGenerate({email: admin.email}, process.env.SECRET_JWT_KEY)

            const uniqueLink = uuid.v4()

            await sendMail(email, 'http://localhost:5000/admin/movies' + '/activate/' + uniqueLink + '/token/' + token)

            await admin.update({email, password: admin.password, activationLink: uniqueLink})

            return res.status(200).json('Kirish linki Emailingizga yuborildi!')
        } catch (error) {
            console.log(error.message);
            res.json('Xato chiqdi!')
        }
    },
    registr: async (req, res) => {
        try {
            const { email, password } = req.body
            const OldAdmin = await AdminModel.findOne({ email })
            if (OldAdmin) {
                return res.json('This admin already have got')
            }
            const HashPassword = await bcrypt.hash(password, 10)
            const admin = await AdminModel.create({ email, password: HashPassword, activationLink: 'http://google.com' })

            res.status(201).json({ admin })
        } catch (error) {
            res.json('Something went wrong!')
        }
    },
    activation: async (req, res) => {
        
        const admin = await AdminModel.findOne({activationLink: req.params.uniqueLink})
        const token = await adminService.tokenVerify(req.params.token, process.env.SECRET_JWT_KEY)

        console.log(token);


        if(!admin){
            return res.send(true)
        }

        if(token){
            if(token.message){
                return res.redirect(process.env.FRONTEND_URL)
            }
        }
        res.json({admin, token})
    }
}