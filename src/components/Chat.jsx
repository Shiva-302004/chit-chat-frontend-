import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useChat } from '../context/Chatprovider'
import SideDrawer from '../chats/SideDrawer';
import MysChats from '../chats/MysChats';
import ChatBox from '../chats/ChatBox';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const Chat = () => {
  const { chat, setchat, user, selectedChat } = useChat();
  const router=useNavigate()
  useEffect(()=>{
    const usernew=JSON.parse(localStorage.getItem("User"))
    if(!usernew.verified){
      router(`/user/${usernew?.email}`)
    }
  },[])
  const [fetchagain, setfetchagain] = useState(false)
  return (
    <div className='w-full h-[100vh] flex flex-col'>
      {user && <SideDrawer />}
      <Box width={"100%"} height={"100%"} display={"flex"} flexDirection={"row"} justifyContent={'space-between'} alignItems={'center'} padding={"2px"}>
        <div className={`${selectedChat ? "hidden" : "block"} md:flex`}>{user && <MysChats fetchagain={fetchagain} setfetchagain={setfetchagain} />}</div>
        <div className={`${selectedChat ? "block" : "hidden"} md:flex`}>{user && <ChatBox fetchagain={fetchagain} setfetchagain={setfetchagain} />}</div>
      </Box>
    </div>
  )
}

export default Chat
