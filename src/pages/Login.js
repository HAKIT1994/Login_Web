import React, {useEffect, useState} from 'react'
import './Login.css'
import { useNavigate } from "react-router-dom";
import { auth, logIn } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

    function Login() {

        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        const [user, loading, error] = useAuthState(auth);
        const navigate = useNavigate();

        
        useEffect(() => {
            if (loading) {
                // maybe trigger a loading screen
                return;
              }
            if (user) return navigate("/home");
        }, [user, loading]);

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
                                    <td>Email: </td>
                                    <td><input type='text' name='uid' required onChange={(e) => setEmail(e.target.value)}/></td>
                                </tr>
                                <tr>
                                    <td>Password:</td>
                                    <td><input type='password' name='pwd' required onChange={(e) => setPassword(e.target.value)} /></td>
                                </tr>
                                <tr>
                                    <td colSpan='2'>
                                        <input className="login__btn" type="button" value='Login'  onClick={()=>logIn(email,password)} />
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