import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie"
import {GoogleLogin} from "react-google-login"

const AuthModal = ({setShowModal, setIsSignUp , isSignUp}) => {
    const [email,setEmail] = useState(null)
    const [password,setPassword] = useState(null)
    const [confirmPassword,setConfirmPassword] =useState(null)
    const [error,setError] = useState(null)
    const [cookies , setCookie, removeCookie ] =useCookies(null)

    let navigate = useNavigate()
    const handleClick = () => {
        setShowModal(false)
    }
    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    const onLoginSuccess = async (res) => {
        console.log('Login Success:', res.profileObj);
        const email= res.profileObj.email
        const response = await axios.post("http://localhost:8000/auth/google", {email})
        setCookie("AuthToken",response.data.token)
        setCookie("UserId", response.data.userId)
        const success = response.status === 201
        
        if(success && isSignUp) navigate ('/onboarding')
        if(success && !isSignUp) navigate ('/dashboard')

        window.location.reload()
    };

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    };
    const handleSubmit =async (e) =>{
        e.preventDefault()
        try {
            if(isSignUp && (password !== confirmPassword)){
                setError("Passwords need to match!")
                return
            }
            if(!validateEmail(email)){
                setError("Please enter a valid email!")
                return
            } 
            const response = await axios.post(`http://localhost:8000/${isSignUp ? "signup": "login"}`, {email,password})
            setCookie("AuthToken",response.data.token)
            setCookie("UserId", response.data.userId)
            const success = response.status === 201

            if(success && isSignUp) navigate ('/onboarding')
            if(success && !isSignUp) navigate ('/dashboard')

            window.location.reload()
        }
        catch (err){
            console.log(err)
        }
    }
    return (
        <div className="modal" onClick={handleClick}>
        <div className="auth-modal" onClick={(e)=>{e.stopPropagation()}}>
            <div className="close-icon-container" onClick={handleClick}><FaTimes className="close-icon" /></div>
            <h2>{isSignUp ? "Create Account" : "Login"}</h2>
            <p>By clicking {isSignUp ? "Create Account" : "Login"} you agree to our terms of service and privacy statement</p>
            <form onSubmit={handleSubmit} autoComplete="off">
            <div className="form-floating mb-3">
                <input 
                    type="email" 
                    className="form-control"
                    id="email" 
                    name="email" 
                    placeholder="email" required 
                    onChange={(e)=>{setEmail(e.target.value)}} 
                    autoComplete="off">
                </input>
                <label htmlFor="email">Email</label>
            </div>
               
               <div className="form-floating mb-3"> 
               <input 
                    type="password" 
                    id="password" 
                    className="form-control"
                    name="password" 
                    placeholder="password" required 
                    onChange={(e)=>{setPassword(e.target.value)}}  
                    autoComplete="off">
                </input>
                <label htmlFor="password">Password</label>
               </div>
                
                {isSignUp && 
                <div className="form-floating mb-3">
                <input 
                    type="password" 
                    id="password-check" 
                    className="form-control"
                    name="password-check" 
                    placeholder="confirm password" required 
                    onChange={(e)=>{setConfirmPassword(e.target.value)}}>
                </input>
                <label htmlFor="password-check">Confirm Password</label>
                </div>}
                <button className="secondary-button" type="submit">{isSignUp ? "Create": "Login"}</button>
                <p>{error}</p>
            </form>
                 <GoogleLogin
                    className="gg-login-btn"
                    clientId={process.env.REACT_APP_CLIENT_ID}
                    buttonText="LOGIN WITH GOOGLE"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                />
            <hr />
            <h2>GET YOUR DATE</h2>
        </div>
        </div>
 
       
    )
}

export default AuthModal