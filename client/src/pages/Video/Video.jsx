import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetMovieQuery } from '../../services/movies'

const Video = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetMovieQuery(id)
  const [video, setVideo] = useState("")
  const [error, setError] = useState('')
  useEffect(() => {
    if (!isLoading) {
      if (data.error) {
        setError(data.message)
      } else {

        setVideo(data?.url)
      }
    } 
    console.log('afae');
  })

  return (
    <div>
      {
        error ? <h1>{error}</h1> :
          <video src={video} controls></video>
      }
    </div>
  )
}

export default Video