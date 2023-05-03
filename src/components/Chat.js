import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, MoreVert, SearchOutlined, InsertEmoticon } from "@material-ui/icons";
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css';
import axios from './axios';
import { useStateValue } from './StateProvider';

const Chat = ({ messages }) => {
    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const [{ user }, dispatch] = useStateValue();
    const [reactions, setReactions] = useState({});
    const [selectedEmoji, setSelectedEmoji] = useState("");

    const sendMessage = async (e) => {
        e.preventDefault();
        await axios.post('/messages/new', {
            message: input,
            name: user.displayName,
            timestamp: new Date().toUTCString(),
            received: true
        });
        setInput("");
    };

    const handleReaction = (messageId) => {
        const newReactions = { ...reactions };
        if (newReactions[messageId]) {
            // Reaction already exists, remove it
            const index = newReactions[messageId].indexOf(selectedEmoji);
            if (index !== -1) {
                newReactions[messageId].splice(index, 1);
            }
            // Remove message ID from reactions state if no reactions are left for that message
            if (newReactions[messageId].length === 0) {
                delete newReactions[messageId];
            }
        } else {
            // Add new reaction
            newReactions[messageId] = [selectedEmoji];
        }
        setReactions(newReactions);
    };

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dice-bear.com/api/human/b${seed}.svg`} />
                <div className="chat_headerInfo">
                    <h2>Dev Help</h2>
                    <p>Last Seen at {""}
                        {messages[messages.length - 1]?.timestamp}
                    </p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
                {messages.map(message => (
                    <div key={message._id} className={`chat_message ${message.name == user.displayName && 'chat_receiver'}`}>
                        <span className="chat_name">{message.name}</span> {message.message}
                        <span className="chat_timestamp">{message.timestamp}</span>
                        <div className="chat_reactions">
                            {reactions[message._id] && reactions[message._id].map(emoji => (
                                <span key={emoji} className="chat_reaction" onClick={() => handleReaction(message._id)}>{emoji}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="chat_footer">
                <InsertEmoticon />
                <form>
                    <input
                        value={input}
                        onChange = {e => setInput(e.target.value)}
                    placeholder ="Type a message"
                    type="text"
                />
                <button onClick ={sendMessage} type ="submit"> Send a Message</button>
            </form>
            <MicIcon/>
        </div>
        </div>
    )
}
export default Chat
