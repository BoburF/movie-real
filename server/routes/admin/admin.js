const {Router} = require('express')
const router = Router()
const control = require('../../controller/admin/admin')

router.post('/auth/login', control.login)

router.post('/auth/register', control.registr)

router.post('/auth/verification', control.verification)

router.get('/activate/:uniqueLink/token/:token', control.activation)

router.use('/movies', require('./movies'))

module.exports = router