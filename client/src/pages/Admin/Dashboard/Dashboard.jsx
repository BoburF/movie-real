import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import verification from '../../../admin/verification'
import { useAddMovieMutation, useDelMovieMutation, useGetForAdminMoviesQuery } from '../../../services/movies'

const Dashboard = () => {
    const [deletePost, { data: delData }] = useDelMovieMutation()
    const [params] = useState(useParams())

    const [name, setName] = useState('')
    const [img, setImg] = useState('')
    const [url, setUrl] = useState('')
    const [genre, setGenre] = useState([])
    const [related, setRelated] = useState(1900)
    const [top, setTop] = useState(10)

    const [createMovie] = useAddMovieMutation()

    const [createmessage, setCreatemessage] = useState('')

    const addMovie = async (e) => {
        e.preventDefault()
        const movie = await createMovie({ name, img, url, genre, related, top })
        setCreatemessage(movie.data)
    }


    const { data, isLoading } = useGetForAdminMoviesQuery()

    const [delmessage, setDelmessage] = useState('')



    const dellHandler = async (id) => {
        await deletePost(id)
        setDelmessage(delData)
    }

    useEffect(() => {
        if (delData) setDelmessage(delData)
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
    }, [delmessage, params.token, params.email])

    return (
        <div>
            <h1>Dashboard</h1>
            <form onSubmit={(e) => addMovie(e)}>
                <div className="message">
                    {
                        createmessage
                    }
                </div>
                <input type="text" name='name' value={name} placeholder='name' onChange={(e) => setName(e.target.value)} />
                <input type="text" name='img' value={img} placeholder='img' onChange={(e) => setImg(e.target.value)} />
                <input type="text" name='url' value={url} placeholder='url' onChange={(e) => setUrl(e.target.value)} />
                <input type="text" name='genre' value={genre} placeholder='genre' onChange={(e) => setGenre(e.target.value)} />
                <input type="number" name='related' value={related} placeholder='related' onChange={(e) => setRelated(e.target.value)} />
                <input type="number" name='top' value={top} placeholder='top' onChange={(e) => {
                    if (e.target.value >= 10) {
                        setTop(10)
                    } else {
                        setTop(e.target.value)
                    }
                }} />
                <button>add movie</button>
            </form>

            <div className="movies">
                <div className="message">
                    {delmessage}
                </div>
                {
                    isLoading ? 'Loading...' : data?.map((item, idx) => (
                        <div key={idx}>
                            {item.name}
                            <button onClick={() => dellHandler(item._id)}>Delete</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Dashboard