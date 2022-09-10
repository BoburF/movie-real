import { useEffect } from 'react'
import Card from '../../components/Card/Card';
import { useGetMoviesQuery } from '../../services/movies'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './Home.scss'
import { useState } from 'react';

const Home = () => {
    const { data, isLoading } = useGetMoviesQuery()

    // const SetLocal = (url) => {
    //     if (localStorage.getItem('movie')) {
    //         localStorage.removeItem('movie')
    //     }
    //     localStorage.setItem('movie', url)

    //     window.location = '/movie'
    // }

    // useEffect(() => {

    // }, [])


    return (
        <div className='movies_flex'>
            {
                data?.length ? data?.map((item, index) => {
                    return (<Card key={index} data={item} />)
                }) : [1,2,3,4,5,6,7,8].map((item, index) => <Skeleton key={index} variant="rectangular" width={250} height={300} highlightColor='#333' baseColor='#000' />)
            }
        </div>
    )
}

export default Home