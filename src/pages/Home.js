import React,  { useEffect, useState } from 'react'
import './Home.css'
import { auth, db} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {updateProfile} from 'firebase/auth'

function Home() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const photoURL = user.photoURL;
  const [selectedImage, setSelectedImage] = useState(null);

  if (user){var Emailname = user.email.split("@")[0]}

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user) return navigate("/login");
  }, [user, loading]);
  
  function uploadtofirebase(img) {
    console.log(img)
    console.log(user.displayName)
    updateProfile(user, {
      displayName: "Jane Q. User", photoURL: img
    }).then(() => {
      // Profile updated!
      console.log(photoURL)
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });
  }

  return (
    <>
    <div className='home'>
      <div className='home__msg'>
          <h2>Welcome {Emailname}</h2>
          
          <div>
          {/* <h2>Upload and Display Image </h2>
          {selectedImage && (
            <div>
            <img alt="not fount" width={"250px"} className='upload__img' src={URL.createObjectURL(selectedImage)} />
            <br />
            <button onClick={()=>setSelectedImage(null)}>Remove</button>
            </div>
          )}
          <br />
          <br /> 
          <input type="file" name="myImage" onChange={(event) => {
              console.log(event.target.files[0]);
              setSelectedImage(event.target.files[0]);
              
          }}/>
          <button type="button" onclick={uploadtofirebase(selectedImage)}>upload</button>
          
          {photoURL}
          {console.log(auth.currentUser)}
           */}
    </div>
      </div>
    </div>
    </>
  )
}

export default Home