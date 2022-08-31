import React from 'react'
import { useState } from 'react'

const Video = () => {
    const [video, setVideo] = useState(localStorage.getItem('movie'))
  return (
    <div>
        <video src={video} controls></video>
    </div>
  )
}

export default Video