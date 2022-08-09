import React,  { useEffect, useState } from 'react'
import './Home.css'
import { auth, db} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { updateProfile} from 'firebase/auth'

function Home() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const displayName = (user||[]).displayName;
  // const [changename,setChangename] = useState()


  if (user){var Emailname = user.email.split("@")[0]}
  // if (displayName){Emailname=displayName}

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user) return navigate("/login");
  }, [user, loading]);
  

  // function ChName(){
  //   updateProfile(user, {
  //     displayName: changename
  //   }).then(() => {
  //     return navigate("/home");
  //   }).catch((error) => {
  //     alert(error.code)
  //     // An error occurred
  //     // ...
  //   });
  // }

  return (
    
    <>
    <div className='home'>
      <div className='home__msg'>
          <h2>Welcome {Emailname}</h2>
          
      </div>
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
          
          </div>
          <div className='user__option'>
          <table className='user__option__item'>
            <tr>
              <td><input type='text' placeholder={Emailname} onChange={(e) => setChangename(e.target.value)} /></td>
              <td><button className="chat_btn" onClick={ChName}>Update User Name</button></td>
            </tr>
          </table>
          </div>  */}
    </div>
    </>
  )
}

export default Home