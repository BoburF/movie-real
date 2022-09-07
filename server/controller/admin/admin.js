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

            if (!passwordTrue) {
                return res.json("Parol noto'g'ri")
            }
            const token = await adminService.tokenGenerate({ email: admin.email }, process.env.SECRET_JWT_KEY)
            const uniqueLink = uuid.v4()

            sendMail(email, process.env.BACKEND_URL + '/admin/movies' + '/activate/' + uniqueLink + '/token/' + token)

            await admin.updateOne({ email, password: admin.password, activationLink: uniqueLink })

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

        const admin = await AdminModel.findOne({ activationLink: req.params.uniqueLink })
        const token = await adminService.tokenVerify(req.params.token, process.env.SECRET_JWT_KEY)
        if (!admin) {
            return res.redirect(process.env.FRONTEND_URL.split(' ')[0])
        }

        if (token) {
            return res.redirect(process.env.FRONTEND_URL.split(' ')[0])
        }
        res.redirect(process.env.FRONTEND_URL.split(' ')[0] + `/admin/auth/login/to/admin/isactivate/admin/${admin.email}/token/${req.params.token}`)
    },
    verification: async (req, res) => {
        const { token, email } = req.body
        const isPass = await adminService.tokenVerify(token, process.env.SECRET_JWT_KEY)
        let admin = ''
        try {
            const adminPass = await AdminModel.findOne({ email })
            admin = adminPass
        } catch (error) {
            console.log(error.message);
            admin = ''
        }
        if (!admin) {
            return res.json(false)
        }
        if (isPass) {
            return res.json(false)
        }
        return res.json('Verification is succed!')
    }
}