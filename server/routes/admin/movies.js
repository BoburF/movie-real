const router = require('express').Router()
const controller = require('../../controller/admin/movies')

router.get('/', controller.getAll)

router.post('/add', controller.addMovie)

module.exports = router