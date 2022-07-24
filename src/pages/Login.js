import React, {useState} from 'react'
import './Login.css'
import Home from './Home'
import { app } from '../firebase';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

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

    function Login() {

        const [errorMessages, setErrorMessages] = useState({});
        const [isSubmitted, setIsSubmitted] = useState(false);
        const [currentuser, setCurrentuser] = useState({});

        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('')

        const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

        const handleSubmit = (event) => {
            const authentication = getAuth();

            createUserWithEmailAndPassword(authentication, email, password)
            event.preventDefault();
            var { uid, pwd } = document.forms[0];

            const userData = database.find((user) => user.username === uid.value);

            if (userData) {
                if (userData.password !== pwd.value) {
                setErrorMessages({ name: "login", message: "Incorrect Password!" });
                // console.log("pw error")
                } else {
                    setIsSubmitted(true);
                    setCurrentuser(userData.username)
                }
            } else {
                setErrorMessages({ name: "login", message: "User not Found!" });
                // console.log("ac error")
            }
        };
        

        const renderForm = (
            <div>
                <div className='login'>
                    <div className='login__container'>
                        <div className='login__logo'>
                            <img src="./images/chrome.png" alt='logo'/>
                        </div>
                        <h2> Login to Web</h2>
                    </div>

                    {/* error handle */}
                    <form onSubmit={handleSubmit}>
                    {renderErrorMessage("login")}

                        {/* login form */}
                        <table class="login__form">
                            <tr>
                                <td>Name: </td>
                                <td><input type='text' name='uid' required onChange={(e) => setEmail(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td>Password:</td>
                                <td><input type='password' name='pwd' required onChange={(e) => setPassword(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td colspan='2'>
                                    <input class="login__btn" type='submit' value='Login'  />
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
        );

    return (
        <>
                {isSubmitted ? <Home uid={currentuser}/> : renderForm}
        </>
    )
}

export default Login