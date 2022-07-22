import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './Navbar.css'
import Login from './pages/Login'
import Register from './pages/Register'

function Navbar() {
  return (
    <>
    <div className='Navbar'>
        <div className='Navbar__container'>
            <ul>
                <li> <Link to="/login" className='Navbar__item'>Login</Link></li>
                <li> <Link to="/register" className='Navbar__item'>Register</Link></li>
            </ul>
        </div>
        <Routes>
            <Route exact path='/' element={<Login/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
        </Routes>
    </div>
    </>
  )
}

export default Navbar