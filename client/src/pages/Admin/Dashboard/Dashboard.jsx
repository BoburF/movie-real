import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import verification from '../../../admin/verification'
import { useAddMovieMutation } from '../../../services/movies'

const Dashboard = () => {
    const [params, setToken] = useState(useParams())
    const ChackParams = async () => {
        try {
            const res = await verification(params.token, params.email);
            if (!res.data) {
                window.location = '/'
            } else {
                localStorage.setItem('token', params.token)
            }
        } catch (error) {
            console.log(error);
        }
    }
    ChackParams()

    const [name, setName] = useState('')
    const [img, setImg] = useState('')
    const [url, setUrl] = useState('')
    const [genre, setGenre] = useState([])
    const [related, setRelated] = useState(1900)
    const [top, setTop] = useState(1900)

    const [createMovie] = useAddMovieMutation()

    const addMovie = async (e) => {
        e.preventDefault()
        const movie = await createMovie({name, img, url, genre, related, top})
        console.log(movie);
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <form onSubmit={(e) => addMovie(e)}>
                <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)}/>
                <input type="text" name='img' value={img} onChange={(e) => setImg(e.target.value)}/>
                <input type="text" name='url' value={url} onChange={(e) => setUrl(e.target.value)}/>
                <input type="text" name='genre' value={genre} onChange={(e) => setGenre(e.target.value)}/>
                <input type="number" name='related' value={related} onChange={(e) => setRelated(e.target.value)}/>
                <input type="number" name='top' value={top} onChange={(e) => setTop(e.target.value)}/>
                <button>add movie</button>
            </form>
        </div>
    )
}

export default Dashboard