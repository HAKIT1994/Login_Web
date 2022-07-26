import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { auth, logout  } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const handlelogout = async (e) => {
    e.preventDefault();
    try{
      await logout(auth)
      navigate("/");
    }catch (error){
      console.log(error.message);
    }
  }

  return (
    <>
    <div className='Navbar'>
        <div className='Navbar__container'>
            {user? (           
            <ul>
                <li> <Link to="/home" class='Navbar__item'>Home</Link></li>
                <li> <Link to="/chat" class='Navbar__item'>Chat</Link></li>
                <li> <Link to="#" class='Navbar__item' onClick={handlelogout}>Logoff</Link></li>
            </ul>
            ):(
            <ul>
                <li> <Link to="/login" class='Navbar__item'>Login</Link></li>
                <li> <Link to="/register" class='Navbar__item'>Register</Link></li>
            </ul>
            ) }



        </div>
    </div>
    {/* <span class="dot"></span> */}
    </>
  )
}

export default Navbar