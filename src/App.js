import './App.css';
import {Routes, Route} from 'react-router-dom'
import Navbar from './Navbar'
import Login from "./pages/Login";
import Register from './pages/Register'
import Home from './pages/Home'


function App() {
  return (
    <>
      <Navbar/>
      <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/home' element={<Home/>}/>
      </Routes>
    </>
  );
}

export default App;
