import React,  { useEffect, useState } from 'react'
import './Home.css'
import { auth, db} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";

function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");

  return (
    <>
    <div className='home__msg'>
        Welcome {user.email}
    </div>
    </>
  )
}

export default Home