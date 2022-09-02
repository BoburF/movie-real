import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../constants/const'


export const Movies = React.createContext({})

export const Films = () => {
  return useContext(Movies)
}

const Context = ({ children }) => {
  const [movies, setMovies] = useState([])
  useEffect(() => {
    axios.get(BASE_URL + '/movies').then(res => {
      setMovies(res.data)
    })
  }, [])

  return (
    <Movies.Provider value={{ movies, setMovies }}>
      {children}
    </Movies.Provider>
  )
}

export default Context