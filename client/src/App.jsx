import './App.scss';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home';
import Video from './pages/Video/Video';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies/:id' element={<Video />} />
        <Route path='*' element={<div>404</div>}/>
      </Routes>
    </div>
  );
}

export default App;
