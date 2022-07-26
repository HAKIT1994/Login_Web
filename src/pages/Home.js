import React,  { useEffect, useState } from 'react'
import './Home.css'
import { auth, db} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

function Home() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  if (user){var Emailname = user.email.split("@")[0]}
  

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user) return navigate("/login");
  }, [user, loading]);

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