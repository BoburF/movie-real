const router = require('express').Router()
const controller = require('../../controller/admin/movies')

router.get('/', controller.getAll)

router.post('/add', controller.addMovie)

router.delete('/del/:id', controller.delMovie)

module.exports = router