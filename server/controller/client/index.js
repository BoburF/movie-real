const MoviesModule = require('../../model/movies')

module.exports = {
    movies: async (req, res) => {
        try {
            const movies = await MoviesModule.find()
            res.json(movies)
        } catch (error) {
            res.json({ message: 'Filmlar topilmadi', error: error.message })
        }
    },
    movieOne: async (req, res) => {
        try {
            const movie = await MoviesModule.findById(req.params.id)
            res.json(movie)
        } catch (error) {
            res.json({ message: 'Filml topilmadi', error: error.message })
        }
    },
    movieOneRedirect: async (req, res) => {
        try {
            const movie = await MoviesModule.findById(req.params.id)
            res.redirect(movie.url)
        } catch (error) {
            res.json({ message: 'Filml topilmadi', error: error.message })
        }
    },
    moviesAdd: async (req, res) => {
        try {
            const movie = await MoviesModule.create(req.body)
            res.json('Movie created: ' + movie)
        } catch (error) {
            res.json('Movie not created')
        }
    }
}