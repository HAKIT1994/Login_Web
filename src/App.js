import './App.css';
import {Routes, Route} from 'react-router-dom'
import Navbar from './Navbar'


function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='*' />
      </Routes>
    </>
  );
}

export default App;
