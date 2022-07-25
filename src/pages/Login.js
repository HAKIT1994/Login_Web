import React, {useEffect, useState} from 'react'
import './Login.css'
import Home from './Home'
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword  } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

    // User Login info
    const database = [
        {
        username: "user1",
        password: "pass1"
        },
        {
        username: "user2",
        password: "pass2"
        }
    ];

    function Login(props) {

        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [currentuser, setCurrentuser] = useState({});
        // const [response,setResponse] = useState("");
        const [user, loading, error] = useAuthState(auth);
        const navigate = useNavigate();
        useEffect(() => {
          if (loading) {
            // maybe trigger a loading screen
            return;
          }
          if (user) navigate("/Home");
        }, [user, loading]);


        // const renderErrorMessage = (name) =>
        // name === errorMessages.name && (
        //     <div className="error">{errorMessages.message}</div>
        // );

        // const handleSubmit = (event) => {

        //     event.preventDefault();
        //     var { uid, pwd } = document.forms[0];

        //     const userData = database.find((user) => user.username === uid.value);

        //     if (userData) {
        //         if (userData.password !== pwd.value) {
        //         setErrorMessages({ name: "login", message: "Incorrect Password!" });
        //         console.log("pw error")
        //         } else {
        //             setIsSubmitted(true);
        //             setCurrentuser(userData.username)
        //         }
        //     } else {
        //         setErrorMessages({ name: "login", message: "User not Found!" });
        //         console.log("ac error")
        //     }
        // };


    return (
        <>
            <div>
                <div className='login'>
                    <div className='login__container'>
                        <div className='login__logo'>
                            <img src="./images/chrome.png" alt='logo'/>
                        </div>
                        <h2> Login to Web</h2>
                    </div>


                    <form>
                        {/* login form */}
                        <table class="login__form">
                            <tr>
                                <td>Name: </td>
                                <td><input type='text' name='uid' required onChange={(e) => setEmail(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td>Password:</td>
                                <td><input type='password' name='pwd' required onChange={(e) => setPassword(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td colspan='2'>
                                    <input class="login__btn" type="button" value='Login'  onClick={() => logInWithEmailAndPassword(email, password)} />
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login