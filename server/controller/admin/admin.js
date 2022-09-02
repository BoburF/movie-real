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
            console.log(password);
            const passwordTrue = await bcrypt.compare(password, admin.password)
            console.log(passwordTrue);


            if (!passwordTrue) {
                return res.json("Parol noto'g'ri")
            }
            console.log('asfasf');
            const token = await adminService.tokenGenerate(admin.email, process.env.SECRET_JWT_KEY)

            const uniqueLink = uuid.v4()

            await sendMail(email, process.env.FRONTEND_URL + '/activate/link/:' + uniqueLink)

            await admin.update({email, password: admin.password, activationLink: uniqueLink})

            res.status(200).json({ email: admin.email, token })
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
        
        if(admin){
            return res.send(true)
        }else{
            return res.send(false)
        }

    }
}