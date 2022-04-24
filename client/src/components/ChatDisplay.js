import axios from "axios";
import { useEffect, useState } from "react";
import Chat from "./Chat";
import ChatInput from "./ChatInput";

const ChatDisplay = ({ user, clickedUser }) => {
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;
  const [userMessages, setUserMessages] = useState(null)
  const [clickedUserMessages, setClickedUserMessages] = useState(null)

  const getUserMessages = async function () {
    try {
      const response = await axios.get("http://localhost:8000/messages", {
        params: { userId: userId, correspondingUserId: clickedUserId },
      })
     setUserMessages(response.data)
    } catch (err) {
      console.log(err);
    }
  };
  const getClickedUserMessages = async function () {
    try {
      const response = await axios.get("http://localhost:8000/messages", {
        params: { userId: clickedUserId, correspondingUserId: userId },
      })
     setClickedUserMessages(response.data)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(()=>{
      getUserMessages() 
      getClickedUserMessages()
  }, [])

  const messages =[]
  userMessages?.forEach(message => {
        const formattedMessage = {}
        formattedMessage['name'] = user?.first_name
        formattedMessage['id'] = user?.user_id;
        formattedMessage['img'] = user?.url
        formattedMessage['message'] = message.message
        formattedMessage['timestamp'] = message.timestamp
        messages.push(formattedMessage)
  });
  
  clickedUserMessages?.forEach(message => {
        const formattedMessage = {}
        formattedMessage['name'] = clickedUser?.first_name
        formattedMessage['id'] = clickedUser?.user_id;
        formattedMessage['img'] = clickedUser?.url
        formattedMessage['message'] = message.message
        formattedMessage['timestamp'] = message.timestamp
        messages.push(formattedMessage)
  });

  const descendingOrderMessages = messages?.sort((a, b) => {return a.timestamp.localeCompare(b.timestamp)} )

  return (
    <>
      <Chat descendingOrderMessages= {descendingOrderMessages} userId={userId} clickedUserId={clickedUserId}/>
      <ChatInput 
        user = {user}
        clickedUser = {clickedUser}
        getUserMessages = {getUserMessages}
        getClickedUserMessages = {getClickedUserMessages}
      />
    </>
  );
};

export default ChatDisplay;
