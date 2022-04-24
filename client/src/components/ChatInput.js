import { useState } from "react"
import axios from "axios"

const ChatInput = ({user,clickedUser, getUserMessages, getClickedUserMessages}) => {
    const [textArea, setTextArea] = useState("")
    const userId = user?.user_id
    const clickedUserId= clickedUser?.user_id
    const addMessage = async function(){
        const message = {
            timestamp: new Date().toISOString(),
            from_userId: userId,
            to_userId: clickedUserId,
            message: textArea.trim() 
        }
        try{
            await axios.post("http://localhost:8000/message", { message })
            getUserMessages()
            getClickedUserMessages()
            setTextArea("")
        }
        catch (err){
            console.log(err)
        }
    }
    const handleChange = (e)=>{
        setTextArea(e.target.value)
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addMessage()
        }
    }
    return (
        <div className="chat-input">
            <textarea rows="1" value={textArea} onChange={handleChange} onKeyDown={handleKeyDown} placeholder="Type message..."></textarea>
            <button type="submit" className="secondary-button" onClick={addMessage}>Send</button>
        </div> 
    )
}

export default ChatInput