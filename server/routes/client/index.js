const {Router} = require('express')
const router = Router()
const control = require('../../controller/client/index')

router.get('/', control.movies)
router.get('/:id', control.movieOne)
router.get('/movie/:id', control.movieOneRedirect)
router.post('/add', control.moviesAdd)


module.exports = router