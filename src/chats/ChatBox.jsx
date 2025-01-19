import { Box, Button, MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useChat } from '../context/Chatprovider';
import SingleChats, { getSenderFull } from './SingleChats';
import { getSender } from './SingleChats';
import TransitionsModal from './ProfilefullModel';
import GroupProfileModal from './GroupProfileModal';
// import TransitionsModal from './ProfilefullModel';
// import TransitionsModal from './ProfileModal';
const ChatBox = ({ fetchagain, setfetchagain }) => {
  const [chat, setchat] = useState()
  const { loggeduser, selectedChat, setselectedChat } = useChat()
  return (
    <div className='w-[95vw] md:w-[65vw] bg-pink-100 rounded-md h-[90vh] m-3 pl-2 pt-4'>
      <Box display={'flex'} flexDirection={"row"} justifyContent={"space-between"}>
        <div className='flex md:hidden'> {selectedChat !== null ? <Button variant='outlined' size='xs' className='h-[35px] w-[10px] pl-2 pt-4' startIcon={<KeyboardBackspaceIcon />} onClick={() => {setselectedChat(null);localStorage.removeItem("selectedchat")}} /> : <></>}</div>
        {
          selectedChat ? <div className='flex w-full'>{!selectedChat.isGroupChat ? <div className='flex justify-between w-full'><span className='capitalize text-md md:text-xl text-pink-400 ml-5'>{selectedChat != null ? getSender(loggeduser, selectedChat?.users) : <></>}</span><div><TransitionsModal user={selectedChat ? getSenderFull(loggeduser, selectedChat?.users) : loggeduser}><MenuItem></MenuItem></TransitionsModal></div></div> : <div className='w-full flex justify-between ml-5'><span className='capitalize  text-md md:text-xl text-pink-400'>{selectedChat?.chatName}</span><GroupProfileModal fetchagain={fetchagain} setfetchagain={setfetchagain}><MenuItem /></GroupProfileModal></div>}</div>
            :
            <></>
        }
      </Box>
      <SingleChats fetchagain={fetchagain} setfetchagain={setfetchagain} />
    </div>
  )
}

export default ChatBox
