const MoviesModule = require('../../model/movies')
const adminService = require('../../services/adminService')

module.exports = {
    getAll: async (req, res) => {
        try {
            const movies = await MoviesModule.find()
            const token = await adminService.tokenVerify(req.headers.admintoken, process.env.SECRET_JWT_KEY)

            if (token) {
                return res.redirect(process.env.FRONTEND_URL.split(' ')[0])
            }

            res.json(movies)
        } catch (error) {
            res.json('Filmlar topilmadi')
        }
    },
    addMovie: async (req, res) => {
        try {
            const { name, img, url, genre, related, top } = req.body

            const token = await adminService.tokenVerify(req.headers.admintoken, process.env.SECRET_JWT_KEY)

            if (token) {
                return res.redirect(process.env.FRONTEND_URL.split(' ')[0])
            }
            await MoviesModule.create({ name, img, url, genre: genre.replace(/ +(?= )/g,'').split(' '), related, top })

            res.json('Film yaratildi')
        } catch (error) {
            console.log(error.message);
            res.json(`Error chiqdi: ${error.message}`)
        }
    },
    delMovie: async (req, res) => {
        try {
            const token = await adminService.tokenVerify(req.headers.admintoken, process.env.SECRET_JWT_KEY)

            if (token) {
                return res.redirect(process.env.FRONTEND_URL.split(' ')[0])
            }

            await MoviesModule.findOneAndDelete({id: req.params.id})

            res.json("Film o'chirildi")
        } catch (error) {
            console.log(error.message);
            res.json('Xatolik yuz berdi')
        }
    }
}