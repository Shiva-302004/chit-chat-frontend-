import React, { useEffect, useState } from 'react'
import { useChat } from '../context/Chatprovider'
import axios from 'axios';
import { Box, Button, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ChatLoading from './ChatLoading';
import GroupModal from './GroupChatModal';
export const getSender = (loggeduser, users) => {
  if(users){
    return users[0]?._id === loggeduser?._id ? users[1]?.name : users[0]?.name
  }
  
}
const MysChats = ({ fetchagain, setfetchagain }) => {
  const [loading, setloading] = useState(false)
  const { setchats, chats, selectedChat, setselectedChat, loggeduser, setloggeduser } = useChat();
  const [user,setuser]=useState()
  const fetchChat = async () => {
    setloading(true);
    const data = await axios("https://chit-chat-backend-y7u2.onrender.com/chats/fetchchats", {
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem("token")
      }
    })
    setchats(data.data)
    localStorage.setItem("chats", JSON.stringify(data.data))
    setloading(false)
    console.log(data.data)
  }
  useEffect(() => {
    fetchChat()
    // setselectedChat(chats[0].)
    setuser(JSON.parse(localStorage.getItem("User")))
    setselectedChat(JSON.parse(localStorage.getItem("selectedchat")))
  }, [fetchagain, setfetchagain])
  return (
    <div className='w-[95vw] md:w-[30vw] bg-pink-100 rounded-md h-[90vh]  m-1 md:m-3 md:ml-1 p-2'>
      <Stack direction={"row"} display={"flex"} justifyContent={"space-between"}>
        <Typography margin={"3px"} fontWeight={"bold"}>MyChats</Typography>
        <div>
          <GroupModal />
        </div>
      </Stack>
      <Stack height={"90%"} overflow={"scroll"} direction={"column"} >
        {chats ? <Stack direction={"column"} gap={"10px"}>
          {
            chats.map((item) => {
              return <div key={item._id} className={`${selectedChat?._id === item._id ? "bg-yellow-100" : "bg-slate-300"} border-2 shadow-2xl p-2 rounded-lg`} onClick={() => { setselectedChat(item); localStorage.setItem("selectedchat", JSON.stringify(item)) }}>
                {!item.isGroupChat ? getSender(user, item.users) : item.chatName}
              </div>
            })
          }
        </Stack>
          :
          <ChatLoading />}
      </Stack>
    </div>
  )
}

export default MysChats
