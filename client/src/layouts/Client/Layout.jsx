import './Layout.scss'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import { useState } from 'react'
const Layout = () => {
  return (
    <div className='Layout'>
      <Sidebar/>
      <div className="movies_layout">
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout