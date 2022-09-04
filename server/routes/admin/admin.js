const {Router} = require('express')
const router = Router()
const control = require('../../controller/admin/admin')

router.post('/auth/login', control.login)

router.post('/auth/register', control.registr)

router.get('/activate/:uniqueLink/token/:token', control.activation)

module.exports = router