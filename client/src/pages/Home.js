import Nav from "../components/Nav"
import { useState } from "react"
import AuthModal from "../components/AuthModal"
import { useCookies } from "react-cookie"
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const Home = () => {

const [showModal, setShowModal] = useState(false)
const [isSignUp,setIsSignUp] =useState(true)
const [cookies ,setCookie ,removeCookie] = useCookies(["user"])
const authToken = cookies.AuthToken
let navigate = useNavigate()

const handleClick = () => {
    if(authToken){
        removeCookie("UserId",cookies.UserId)
        removeCookie("AuthToken",cookies.AuthToken)
        window.location.reload()
        return        
    }
    setShowModal(true)
    setIsSignUp(true)
}
const toDashBoard = ()=>{
    if(authToken){
        navigate("/dashboard")
        window.location.reload()
    }
}
const checkUserInfo = async()=>{
    try{
        const userId = cookies.UserId
        const response = await axios.get("http://localhost:8000/userinfo",{
            params: {userId}
          })
          console.log(response)
        if(!response.data){
            navigate("/onboarding")
        } 
        else{
            toDashBoard()
        }
      }
      catch (err){
          console.log(err)
      }
}
    return (
        <div className="overlay">
        <Nav minimal={false} 
            authToken= {authToken}
            setShowModal={setShowModal} 
            showModal={showModal}
            setIsSignUp = {setIsSignUp}
        />
        <div className="home">
            <h1 className="primary-title">Swipe Right</h1>
            {authToken && <button className="primary-button" onClick={checkUserInfo}>Go to Dashboard</button>}
            {authToken ? null: <button className="btn primary-button" onClick={handleClick}>
               Create Account
            </button>}
            {showModal && 
            (<AuthModal 
                setShowModal={setShowModal} 
                isSignUp = {isSignUp}
            />)}
        </div>
        </div>
    )
}

export default Home