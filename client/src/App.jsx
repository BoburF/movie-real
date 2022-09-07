import './App.scss';
import { Routes, Route, useParams } from 'react-router-dom'
import Home from './pages/Home/Home';
import Video from './pages/Video/Video';
import Login from './pages/Admin/Login/Login';
import Dashboard from './pages/Admin/Dashboard/Dashboard';

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies/:id' element={<Video />} />
        <Route path='/admin/auth/login/to/admin' element={<Login />} />
        <Route path='/admin/auth/login/to/admin/isactivate/admin/:email/token/:token' element={<Dashboard />} />
        <Route path='*' element={<div>404</div>} />
      </Routes>
    </div>
  );
}

export default App;
