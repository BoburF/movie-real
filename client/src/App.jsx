import './App.scss';
import Context, { Movies } from './context/movies';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home';
import Video from './pages/Video/Video';

function App() {
  return (
    <Context>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movie' element={<Video />} />
        </Routes>
      </div>
    </Context>
  );
}

export default App;
