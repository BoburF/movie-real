const {Router} = require('express')
const router = Router()
const control = require('../../controller/admin/admin')

router.post('/auth/login', control.login)

router.post('/auth/registr', control.registr)

module.exports = router