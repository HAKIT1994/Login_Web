import React from 'react'
import './Home.css'
import { auth, db, logout } from "../firebase";

function Home(props) {
  return (
    <>
    <div className='home__msg'>
        Welcome {props.uid}
    </div>
    <button className="dashboard__btn" onClick={logout}>
          Logout
         </button>
    </>
  )
}

export default Home