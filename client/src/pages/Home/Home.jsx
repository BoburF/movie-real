import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useGetMoviesQuery } from '../../services/movies'

const Home = () => {
    const { data, isLoading } = useGetMoviesQuery()
    console.log(data);

    const SetLocal = (url) => {
        if (localStorage.getItem('movie')) {
            localStorage.removeItem('movie')
        }
        localStorage.setItem('movie', url)

        window.location = '/movie'
    }

    useEffect(() => {

    }, [])

    return (
        <div>
            Home
            {
                data?.length ? data?.map((item, index) => {
                    return (<Link to={'/movies/' + item._id} key={index}>
                    {item.name}
                    </Link>)
                }) : <p>filmlar...</p>
            }
        </div>
    )
}

export default Home