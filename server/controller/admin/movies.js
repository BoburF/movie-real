const MoviesModule = require('../../model/movies')
const adminService = require('../../services/adminService')

module.exports = {
    getAll: async (req, res) => {
        try {
            const movies = await MoviesModule.find()
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
            console.log(genre.split(' '));
            await MoviesModule.create({ name, img, url, genre: genre.split(' '), related, top })

            res.json('Film yaratildi')
        } catch (error) {
            console.log(error.message);
            res.json(`Error chiqdi: ${error.message}`)
        }
    }
}