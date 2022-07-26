import React, {useEffect, useState} from 'react'
import { useNavigate, Link } from "react-router-dom";
import { auth, logIn } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import './Chat.css'
import {db} from '../firebase'
import {collection, getDocs, addDoc,CollectionReference,firebase} from "firebase/firestore";

const [roomlist,setRoomlist] = []

async function GetData(){
    const querySnapshot = await getDocs(collection(db, "ChatRooms"));

    querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    // setRoomlist (doc) 
    });

    // console.log(roomlist)

}

function Check_Room_Exist(){
    const now = new Date().toLocaleString()
    // console.log(now)
    // 7/26/2022, 3:27:49 PM
}


function Chat() {

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const [posts, setPosts] = useState();

    useEffect(() => {
        if (!user) return navigate("/login");
    }, [user]);

    const createNewChat = async () => {
        const newChatDoc = await addDoc(collection(db, "ChatRooms"), {
        });
      
        const firstMsgDoc = await addDoc(collection(db, "ChatRooms", "newroom", "messages"), {
          content: "Welcome to Chat."
        });
      
        console.log(`New chat created:"testing"`)
      }
      

    return (
        <div className='chat'>
            <h2>Your Chat Rooms</h2>
            <button onClick={createNewChat}>Add ChatRoom</button>
            
            <button onClick={GetData}>Refesh</button>
            {/* <ul className="chat-room-list">
                {chatRooms.map((room) => (
                    <li key={room.id}>
                        <Link to={`/chat/${room.id}`}>{room.title}</Link>
                    </li>
                ))}
            </ul> */}
        </div>
        
    )
}

export default Chat