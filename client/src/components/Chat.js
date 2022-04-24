
const Chat = ({descendingOrderMessages,userId,clickedUserId}) => {
    
    return (
        <div className="chat-display">
           {descendingOrderMessages.map((message,index)=>{
               return( 
                <div className={message.id === clickedUserId ? "chat-message-container":"chat-message-container-user"} key={index} >
                   { message.id===clickedUserId &&
                    <div className="chat-message-header">
                        <div className="img-container">
                            <img src={message.img} alt={message.first_name + "avatar"}/>
                        </div>
                    </div>
                   }
                    <div className={message.id === userId ? "chat-message-content userMessage":"chat-message-content"}>
                       <p>{message.message}</p>
                    </div>
               </div>)   
           })}
        </div>
    )
}

export default Chat