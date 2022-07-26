import React,{ useEffect, useState }  from 'react'
import './Register.css'
import { useNavigate } from "react-router-dom";
import { auth, Signup  } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Register() {

  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const SignupSubmit = async (email,password1,password2) =>{
    if (password1 === password2) {
      const res = await Signup(auth,email,password1)

    }else{
      console.log(password1,password2)
      alert("Two password not the same!")
      return
    }
  }

  useEffect(() => {
    if (loading) return;
    if (user) return navigate("/home");
  }, [user]);

  return (
    <div>
      <div className='signup'>
        <div className='signup__container'>
            <div className='signup__logo'>
                <img src="./images/chrome.png" alt='logo'/>
            </div>
            <h2> Register to Web</h2>
        </div>


            <form>
                {/* signup form */}
                <table class="signup__form">
                    <tr>
                        <td>Email: </td>
                        <td><input type='text' name='uid' required onChange={(e) => setEmail(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td>Password:</td>
                        <td><input type='password' name='pwd1' required onChange={(e) => setPassword1(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Password Again:</td>
                        <td><input type='password' name='pwd2' required onChange={(e) => setPassword2(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td colSpan='2'>
                            <input className="signup__btn" type="button" value='Signup'  onClick={()=>SignupSubmit(email,password1,password2)} />
                        </td>
                    </tr>
                </table>
              </form>
          </div>
      </div>
  )
}

export default Register