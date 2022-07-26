import React,  { useEffect, useState } from 'react'
import './Home.css'
import { auth, db} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Home() {
  const [user, loading, error] = useAuthState(auth);

  var Emailname = user.email.split("@")[0]

  return (
    <>
    <div className='home'>
      <div className='home__msg'>
          <h2>Welcome {Emailname}</h2>
      </div>
    </div>
    </>
  )
}

export default Home