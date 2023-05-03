import React from 'react'
import './Sidebar.css'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import{Avatar,IconButton} from '@material-ui/core'
import{SearchOutlined} from '@material-ui/icons'
import SidebarChat from './SidebarChat'
import {useStateValue} from './StateProvider';

const Sidebar = ({messages}) => {
    const[{user},dispatch] = useStateValue()
    return (
        <div className="sidebar">
        <div className="sidebar_header">
             <Avatar src = "https://pbs.twimg.com/profile_images/1020939891457241088/fcbu814K_400x400jpg"/>
            <div className="sidebar_headerRight">
            <IconButton>
                <DonutLargeIcon/>
            </IconButton>
            <IconButton>
                <ChatIcon/>
            </IconButton>
            <IconButton>
                <MoreVertIcon/>
            </IconButton>
            </div>
        </div>
        <div className="sidebar_search">
            <div className="sidebar_searchContainer">
                <SearchOutlined />
                <input placeholder="Search or start new chat" type = "text" />
            </div>
            </div>
        <div className = "sidebar_chats">
            <SidebarChat messages={messages}/>


        </div>
        </div>

    )
}


export default Sidebar