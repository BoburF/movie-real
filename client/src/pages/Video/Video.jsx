import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetMovieQuery } from '../../services/movies'
import ReactPlayer from 'react-player'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './Video.scss'
import { BASE_URL } from '../../constants/const'

const Video = () => {
  const { id } = useParams()
  const { data, isLoading, isError } = useGetMovieQuery(id)
  const [video, setVideo] = useState("")
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [play, setPlay] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      if (data.error) {
        setError(data.message)
      } else {
        localStorage.setItem('movie', id)
        setVideo(BASE_URL + '/movies/movie/' + data?._id)
        setName(data?.name)
      }
    } else if (isError) {
      setVideo('/movies/movie/631b4ba546b26755547ee2ea')
      setName("Birinchi o'yinga tayyor")
    }
  }, [isLoading, id, isError, data?.name, data?.img, data?.message, data?.error, data?._id])

  return (
    <div className='Video'>
      <div className="video_name">
        {name ? <h3>{name}</h3> : <Skeleton width={300} height={10} highlightColor='#333' baseColor='#000' />}
      </div>
      <div className="video_div">
        {
          error ? <h1>{error}</h1> : video ? <ReactPlayer width={100 + '%'} playing={play} height={90 + '%'} url={video} playIcon={data?.img} controls></ReactPlayer> : <Skeleton width={100 + '%'} height={90 + '%'} highlightColor='#333' baseColor='#000' />
        }
      </div>
    </div>
  )
}

export default Video