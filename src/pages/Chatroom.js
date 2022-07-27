import React, {useEffect, useState} from 'react'
import { useNavigate, Link,useParams } from "react-router-dom";
import {db} from '../firebase'
import { auth, logIn } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {collection, getDocs, addDoc, doc, setDoc,onSnapshot,updateDoc,query,orderBy,serverTimestamp } from "firebase/firestore";
import './Chatroom.css'
import { render } from '@testing-library/react';

function ChatRoom() {

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const params = useParams();
    const [message,setMessage] = useState()
    const [display,setDisplay] = useState()


    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
          }
        if (!user) return navigate("/login");
    }, [user, loading]);


    async function InputMsg() {
        const now = new Date().toLocaleString()
        await addDoc(collection(db,`ChatRooms/${params.id}/Message`),{
            User:user.email,
            Msg: message,
            Timestamp: now,
          })
        
    }

    useEffect(() => {
        const q = query(collection(db, `ChatRooms/${params.id}/Message`), orderBy('Timestamp', 'asc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const resdata = [];
          querySnapshot.forEach((doc) => {
              resdata.push(JSON.stringify(doc.data()));
          })
        setDisplay(resdata)
        // console.log(resdata)
        })
        // console.log(display)
        return () => unsubscribe()

    }, []);


    

    return (
        <div className='chatroom'>
            <div className='chatroom__title'> 
                <h2>{params.id}</h2>
                <h3>Your id: {user.email}</h3>
                <button class="chatroom_btn"><Link to='/chat'>Back to ChatRoom select</Link></button>
            </div>
            <ul className="chatroom__area">

                {/* {display.map((item) => (
                <li key={item}>
                    {item}
                </li>
            ))} */}

            </ul>
            <div className='chatroom__input'>
                <table>
                    <tr>
                        <td><textarea placeholder='Message Here' onChange={(e)=>this.setMessage(e.target.value)}></textarea></td>
                        <td><button className='chatroom_btn' onClick={InputMsg} >Send</button></td>
                    </tr>
                </table>
                
            </div>
        </div>
    )
}

export default ChatRoom