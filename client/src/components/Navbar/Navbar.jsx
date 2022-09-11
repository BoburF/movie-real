import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetMoviesQuery } from '../../services/movies'
import './Navbar.scss'

const Navbar = () => {
  const { data, isLoading } = useGetMoviesQuery()
  const [display, setDisplay] = useState('none')
  const [res, setRes] = useState([])
  const [searchText, setSearchText] = useState('')
  const search = (str) => {
    if (str.length) {
      const da = data?.filter(i => {
        return i.name.toLowerCase().indexOf(str.toLowerCase()) !== -1
      })
      setRes(da)
      setDisplay('block')
    }else{
      setDisplay('block')
    }
  }

  const close = () => {
    setDisplay('none')
    setSearchText('')
  }

  return (
    <div className='Navbar'>
      <div className="search">
        <input type="text" placeholder='Search...' value={searchText} onChange={(e) => {
          setSearchText(e.target.value)
          search(e.target.value)
        }} />
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </div>
      <div className="search_res" style={{ display: display }}>
        {
          res?.length ? res?.map((item, idx) => {
            if (idx < 5) {
              return (<Link to={'/movies/' + item._id} className="res" onClick={(e) => close()} key={idx}>{item.name}</Link>)
            }
          }
          ) : ''
        }
      </div>
    </div>
  )
}

export default Navbar