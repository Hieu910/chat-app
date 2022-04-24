import { BiLogOut } from 'react-icons/bi';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import {IoSettingsSharp} from "react-icons/io5"

const ChatHeader = ({user}) => {
    const [cookies,setCookie,removeCookie] = useCookies(['user'])
    let navigate = useNavigate()
    const logout = ()=>{
        removeCookie('UserId',cookies.UserId)
        removeCookie('AuthToken',cookies.AuthToken)
        navigate ('/')
        window.location.reload()
    }
    const openSetting = ()=>{
    }
    return (
        <div className="chat-container-header">
           <div className="profile">
                <div className="img-container">
                    <img src={user.url} alt="avatar"/>
                </div>
                <h3>{user.first_name}</h3>
           </div>
           <div onClick={openSetting}><IoSettingsSharp className='setting-icon'/></div>
            <GoogleLogout 
                className="log-out-icon"
                clientId="734058757713-h2l0k7cpp493k6e5tvtlnlr2vi77fdql.apps.googleusercontent.com"
                buttonText={<BiLogOut />}
                onLogoutSuccess={logout}
                icon={false}
            />
      
        </div>
    )
}

export default ChatHeader