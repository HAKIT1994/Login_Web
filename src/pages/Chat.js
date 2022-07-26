import React, {useEffect, useState} from 'react'
import { useNavigate, Link } from "react-router-dom";
import { auth, logIn } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import './Chat.css'
import {db} from '../firebase'
import {collection, getDocs, addDoc, doc, setDoc} from "firebase/firestore";

function Chat() {

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const [roomname, setRoomname] = useState('');
    const [roomlist,setRoomlist] = useState([])

    async function GetData(){

        setRoomlist([])
        const querySnapshot = await getDocs(collection(db, "ChatRooms"));
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            setRoomlist(roomlist => [...roomlist,doc.id])
        })
        // console.log(roomlist);
    }

    const createNewChat = async () => {
        if (!roomname) {
            alert("Please Enter a Room Name!") 
            return
        }

        if(roomlist.includes(roomname)){
            alert("Room Already Exist!")
            return
        }

        const now = new Date().toLocaleString()
        await setDoc(doc(db, "ChatRooms", roomname), {  
            message: "Welcome to "+ roomname,
            date: now
          });

        GetData()
      }
      
    
    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
          }
        if (!user) return navigate("/login");
        GetData()
    }, [user, loading]);

    return (
        <div className='chat'>
            <h2>Your Chat Rooms</h2>
            <div chat__action>
                <table>
                    <tr>
                        <td><input type='text' placeholder='New ChatRoom Name' onChange={(e) => setRoomname(e.target.value)} /></td>
                        <td><button onClick={createNewChat}>Add ChatRoom</button></td>
                    </tr>
                    <tr>
                        <button onClick={GetData}>Refesh</button>
                    </tr>
                </table>
            </div>

            {/* Create Room */}
            <ul className="chat-room-list">
                {roomlist.map((room) => (
                    <li key={room}>
                        <Link to={`/chat/${room}`} >{room}</Link>
                    </li>
                ))}
            </ul>
        </div>
        
    )
}

export default Chat