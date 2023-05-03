import React,{useEffect,useState} from 'react'
import{Avatar, IconButton} from '@material-ui/core'
import {AttachFile,MoreVert,SearchOutlined,InsertEmoticon} from "@material-ui/icons";
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css'
import axios from './axios'
import {useStateValue} from './StateProvider';

const Chat = ({messages}) => {
    const[seed,setSeed] =useState("")
    const[input,setInput] = useState("")
    const[{user},dispatch] = useStateValue()
    const sendMessage = async(e) => {
        e.preventDefault()
        await axios.post('/messages/new',{
            message:input,
            name:user.displayName,
            timestamp:new Date().toUTCString(),
            received:true
        })
        setInput("")
    }
    useEffect(() =>{
        setSeed(Math.floor(Math.random() *
5000))
    },[])
    return(
        <div className = "chat">
        <div className = "chat_header">
            <Avatar src={'https://avatars.dice-bear.com/api/human/b${seed}.svg'} />
            <div className = "chat_headerInfo">
                <h2>Dev Help</h2>
                <p>Last Seen at {""}
                    {messages[messages.length-1]?.timestamp}
                </p>
            </div>
            <div className = "chat_headerRight">
                <IconButton>
                    <SearchOutlined/>
                </IconButton>
                <IconButton>
                    <AttachFile/>
                </IconButton>
                <IconButton>
                    <MoreVert/>
                </IconButton>
            </div>
        </div>
        <div className = "chat_body">
            {messages.map(message => (
            <p className={`chat_message ${message.name == user.displayName && 'chat_receiver'}`}>
                <span className = "chat_name">{message.name}
                </span> {message.message}
                <span   className ="chat_timestamp">
                    {message.timestamp}
                </span>
            </p>
            ))}
        </div>
        <div className = "chat_footer">
            <InsertEmoticon/>
            <form>
                <input
                    value = {input}
                    onChange = {e => setInput(e.target.value)}
                    placeholder ="Type a message"
                    type="text"
                />
                <button onClick ={sendMessage}
                        type ="submit"> Send a Message</button>
            </form>
            <MicIcon/>
        </div>
        </div>
    )
}
export default Chat
