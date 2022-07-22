import React,{ useState } from 'react'
import './Login.css'


function Login() {

    const [inputs, setInputs] = useState({});
  
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(inputs)
    }


  return (
    <div className='login'>
        <div className='login__container'>
            <div className='login__logo'>
                <img src="./images/chrome.png" alt='logo'/>
            </div>
            <h2> Login to Web</h2>
            <div>
                <form onSubmit={handleSubmit}>
                <table class="login__form">
                    <tr>
                        <td>Name: </td>
                        <td><input type='text' name='name' value={inputs.name || ""} onChange={handleChange}/></td>
                    </tr>
                    <tr>
                        <td>Password:</td>
                        <td><input type='password' name='pw' value={inputs.pw || ""} onChange={handleChange}/></td>
                    </tr>
                    <tr>
                        <td colspan='2'>
                            <input class="login__btn" type='submit' value='Login' />
                        </td>
                    </tr>
                </table>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login