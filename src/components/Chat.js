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
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [messagePosition, setMessagePosition] = useState({ top: 0, left: 0 });
    const [selectedMessageReactions, setSelectedMessageReactions] = useState([]);



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
        const newSelectedMessageReactions = [...selectedMessageReactions];
        if (newSelectedMessageReactions.includes(selectedEmoji)) {
            // Reaction already exists, remove it
            const index = newSelectedMessageReactions.indexOf(selectedEmoji);
            if (index !== -1) {
                newSelectedMessageReactions.splice(index, 1);
            }
        } else {
            // Add new reaction
            newSelectedMessageReactions.push(selectedEmoji);
        }
        setSelectedMessageReactions(newSelectedMessageReactions);
    };

    const handleSelectedEmoji = (emoji) => {
        setSelectedEmoji(emoji);
        handleReaction(selectedMessage._id);
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
                    <div
                        key={message._id}
                        className={`chat_message ${message.name == user.displayName && 'chat_receiver'}`}
                        onClick={(event) => {
                            setSelectedMessage(message);
                            const rect = event.currentTarget.getBoundingClientRect();
                            setMessagePosition({ top: event.pageY, left: event.pageX });
                        }}
                    >
                        <span className="chat_name">{message.name}</span> {message.message}
                        <span className="chat_timestamp">{message.timestamp}</span>
                        <div className="chat_reactions">
                            {reactions[message._id] &&
                                reactions[message._id].map((emoji) => (
                                    <span
                                        key={emoji}
                                        className="chat_reaction"
                                        onClick={() => handleReaction(message._id)}
                                    >
                                  {emoji}
                                </span>
                                ))}
                        </div>
                    </div>

                ))}
                {selectedMessage && (
                    <div className="chat_message_popup" style={{ top: messagePosition.top, left: messagePosition.left }}>
                        {["😀", "😂", "😍", "👍"].map(emoji => (
                            <IconButton key={emoji} onClick={() => handleSelectedEmoji(emoji)}>
                                <span role="img" aria-label={emoji}>{emoji}</span>
                            </IconButton>
                        ))}
                {selectedEmoji && (
                    <div className="chat_selected_emoji_container" style={{ top: messagePosition.top + 32, left: messagePosition.left }}>
                        <span role="img" aria-label={selectedEmoji}>{selectedEmoji}</span>
                    </div>
                )}
                    </div>

                )}


            </div>
        <div className="chat_footer">

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
