import React, {useEffect, useState, useRef} from 'react'
import { useNavigate, Link,useParams } from "react-router-dom";
import {db} from '../firebase'
import { auth, logIn } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {collection, doc, addDoc, onSnapshot,query,orderBy ,deleteDoc} from "firebase/firestore";
import './Chatroom.css'

function ChatRoom() {

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const params = useParams();
    const [message,setMessage] = useState()
    const [display,setDisplay] = useState()
    const bottomRef = useRef(null);

    useEffect(() => {
        // setEmail(user.email)
        if (loading) {
            // maybe trigger a loading screen
            return;
          }
        if (!user) return navigate("/login");
    }, [user, loading]);


    async function InputMsg() {
        const now = new Date().toLocaleString()
        await addDoc(collection(db,`ChatRooms/${(params||[]).id}/Message`),{
            User:(user || []).email,
            Msg: message,
            Timestamp: now,
          }) 
        setMessage('')  
    }

    useEffect(() => {
        const q = query(collection(db, `ChatRooms/${(params||[]).id}/Message`), orderBy('Timestamp', 'asc'));
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

    function ArrangeMsg(item){
        const result = JSON.parse(item);
        var Emailname = result.User.split("@")[0]
        return (
            <div className='chat_align'>
                <div className={result.User=== user.email ? 'checkbox-own' : 'checkbox-other'}>
                    <div className={result.User=== user.email ? 'sender-me' : 'sender-other'} >
                        {Emailname}</div>
                    <div className='showmsg'>{result.Msg}</div>
                    <div className='showtime'>{result.Timestamp}</div>
                </div>
            </div>
        ) 
    }

    async function DeleteRoom(){
        await deleteDoc(doc(db, "ChatRooms", (params||[]).id));
        navigate("/chat")
    }

    useEffect(() => {
        //  scroll to bottom every time messages change
        bottomRef.current?.scrollIntoView();
      }, [display]);

    return (
        <div className='chatroom'>
            <div className='chatroom__title'> 
                <h2>{(params||[]).id}</h2>
                <h3>Your id: {(user || []).email}</h3>
            <table className='chatroom__btn__table'>
                <tr>
                    <td><button class="chatroom_btn"><Link to='/chat'>Back to ChatRoom select</Link></button></td>
                    <td><button class="chatroom_btn" onClick={() => {
                        const confirmBox = window.confirm(
                        "Do you really want to delete this Chatroom?"
                        )
                        if (confirmBox === true) {
                        DeleteRoom()
                        }
                    }}>Delete Chatroom</button></td>
                </tr>
            </table>
                
            </div>
            <ul className="chatroom__area">
                <div className="chatroom__welcome">Welcome to {(params||[]).id}</div>
                {(display|| []).map((item) => (
                    <li key={item.Timestamp}>
                        {ArrangeMsg (item)}
                    </li>
                 ))}
                 <div ref={bottomRef} />
            </ul>
                <div className='chatroom__table'>
                        <textarea placeholder='Message Here' value={message}
                        onChange={(e)=>setMessage(e.target.value)}></textarea>
                        <button className='chatroom_btn' onClick={InputMsg} >Send</button>
                </div>
            </div>
    )
}

export default ChatRoom