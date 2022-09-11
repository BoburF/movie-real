import { useEffect } from 'react'
import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import './Sidebar.scss'

const Sidebar = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(id ? '/movies/' + id : '/movies/631b4ba546b26755547ee2ea')
  const [position, setPosition] = useState('-100%')
  const [sideBarposition, setSideBarPosition] = useState('10px')

  useEffect(() => {
    setMovie('/movies/' + (id ? id : localStorage.getItem('movie') ? localStorage.getItem('movie') : '631b4ba546b26755547ee2ea'))
    if (id) {
      localStorage.setItem('movie', id)
    }
  }, [id])


  return (
    <>
      <div className="sidebar" onClick={(e) => {
        if (position === '-100%') {
          setPosition('0')
          setSideBarPosition('260px')
        } else {
          setPosition('-100%')
          setSideBarPosition('10px')
        }
      }} style={{ left: sideBarposition }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
        </svg>
      </div>
      <div className='Sidebar' style={window.innerWidth < 981 ? { left: position } : { left: 0 }} onClick={(e) => {
        if(e.target){
          setPosition('-100%')
          setSideBarPosition('40px')
        }
      }}>
        <NavLink to={'/'} className='sidebar_link'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
            <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
          </svg>
          Home
        </NavLink>
        <NavLink to={'' + movie} className='sidebar_link'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-btn" viewBox="0 0 16 16">
            <path d="M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
          </svg>
          Watch
        </NavLink>
      </div>
    </>
  )
}

export default Sidebar