import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Films } from '../../context/movies'

const Home = () => {
    const { movies } = Films()
    const SetLocal = (url) => {
        if (localStorage.getItem('movie')) {
            localStorage.removeItem('movie')
        }
        localStorage.setItem('movie', url)

            window.location = '/movie'
        
        console.log('dasni');
    }

    useEffect(()=>{
        
    }, [])

    return (
        <div>
            Home
            {
                movies.length ? movies.map(item => {
                    return <div className="div" key={item.url} url={item.url} onClick={() => {
                        SetLocal(item.url)
                    }}>
                        {
                            item.name
                        }
                    </div>
                }) : <p>filmlar...</p>
            }
        </div>
    )
}

export default Home