import React, {useEffect, useState} from 'react'
import { useNavigate, Link,useParams } from "react-router-dom";
import {db} from '../firebase'
import { auth, logIn } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {collection, getDocs, addDoc, doc, setDoc} from "firebase/firestore";
import Chat from './Chat'

function ChatRoom() {

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const [roomname, setRoomname] = useState('');
    const params = useParams();

    params={params}

    console.log(params)
    return (
        <>testing</>
    )
}

export default ChatRoom