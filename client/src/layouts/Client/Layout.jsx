import './Layout.scss'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
const Layout = () => {
  return (
    <div className='Layout'>
      <Sidebar />
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Layout