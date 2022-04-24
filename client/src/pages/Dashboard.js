import ChatCard from "react-tinder-card";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ChatContainer from "../components/ChatContainer"
import axios from "axios";
import { ChatEngine, getOrCreateChat } from 'react-chat-engine'

const Dashboard = () => {
    
    const [user, setUser] = useState(null)
    const [genderedUsers, setGenderedUsers] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies(["user"])
    const userId  = cookies.UserId
    const [username, setUsername] = useState("Hieu Nguyen Dinh")
    const getUser = async function(){
        try{
          const response = await axios.get("http://localhost:8000/user",{
            params: {userId}
          })
          setUser(response.data)
        }
        catch (err){
          console.log(err);
        }
    }
    const getGenderedUsers = async function(){
      try {
         const response = await axios.get('http://localhost:8000/gendered-users',{
           params: { gender: user?.gender_interest }
         })
         setGenderedUsers(response.data)
      }
      catch (err){
        console.log(err)
      }
    }

    useEffect(()=>{
      getUser()
    },[])

    useEffect(()=>{
      if(user){
        getGenderedUsers()
      }
    },[user])

    const updatedMatches = async function(matchedUserId){
        try{
          await axios.put("http://localhost:8000/addmatch",{
            userId,
            matchedUserId
          })
          getUser() 
        } catch (err){
          console.log(err)
        }
    }
    const swiped = (direction, swipedUser) => {

        if(direction === "right")
        {
          updatedMatches(swipedUser)
        }
        
    }

    function createDirectChat(creds) {
      getOrCreateChat(
        creds,
        { is_direct_chat: true, usernames: [username] },
        () => setUsername('')
      )
    }
  
    function renderChatForm(creds) {
      return (
        <div>
          <input 
            placeholder='Username' 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <button onClick={() => createDirectChat(creds)}>
            Create
          </button>
        </div>
      )
    }
  
    const outOfFrame = (name) => {
      console.log(name + ' left the screen!')
    }

    const matchedUserIds = user?.matches.map(function({user_id}){
        return user_id
    }).concat(userId) 
    const filteredGenderedUsers = genderedUsers?.filter(function(genderedUser){
        return !matchedUserIds.includes(genderedUser.user_id)
    }) 
   
  return (
    <div>
    {user &&  
    <div className="dashboard">
      <ChatContainer user={user}/> 
      <div className="swipe-container">
        <div className="card-container">
          {filteredGenderedUsers?.map((genderedUser) => (
            <ChatCard
              className="swipe"
              key={genderedUser.user_id}
              onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
              onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}
            >
              <div
                style={{ backgroundImage: "url(" + genderedUser.url + ")" }}
                className="card"
              >
              <div className="card-info">
              <div className="card-header">
                <h3>{genderedUser.first_name}</h3>
                <h2>{new Date().getFullYear()-Number(genderedUser.dob_year)}</h2>
              </div>
                <div className="card-content">
                {genderedUser.about && <p>hello</p> }
                </div>
              </div>
              <div className="card-feature">
              </div>
              </div>
            </ChatCard>
          ))}
        </div>
      </div>
  
    </div>}
   
    </div>
  );
};

export default Dashboard;
