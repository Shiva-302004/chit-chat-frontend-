import React, { useEffect, useState } from 'react'
import { useChat } from '../context/Chatprovider'
import { Box, Button, TextField } from '@mui/material'
import { toast } from 'react-toastify'
import axios from 'axios'
import ScrollableFeed from "react-scrollable-feed"
import io from "socket.io-client"
export const getSender = (loggeduser, users) => {
  if (users) {
    return users[0]?._id === loggeduser._id ? users[1]?.name : users[0]?.name
  }
}
export const getSenderFull = (loggeduser, users) => {
  if (users) {
    return users[0]?._id === loggeduser._id ? users[1] : users[0]
  }
  return { name: "", email: "", pic: "" }
}
const endpoint = "https://chit-chat-backend-y7u2.onrender.com";
var socket, selectedChatCompare;


const SingleChats = ({ fetchagain, setfetchagain }) => {
  const { user, selectedChat, setselectedChat,notification,setnotification} = useChat()
  const [msg, setmsg] = useState([])
  const [text, settext] = useState("")
  var [val, setval] = useState(true);
  var [socketconnected, setsocketconnected] = useState(false)
  const [typing, settyping] = useState(false)
  const [istyping, setistyping] = useState(false)
  console.log(selectedChat?._id)
  useEffect(() => {
    socket = io(endpoint)
    console.log(user)
    if (user._id) {
      socket.emit("setup", user)
      socket.on("connected", () => {
        setsocketconnected(true)
      })
      socket.on("typing", (data) => {
        console.log(data)
        setistyping(true)
      })
      socket.on("stop typing", (data) => {
        console.log(data)
        setistyping(false)
      })
    }

  }, [user])
  const handleClick = async (id) => {
    try {
      socket.emit("stop typing", id)
      const { data } = await axios.post("https://chit-chat-backend-y7u2.onrender.com/message/", { "chatId": id, "content": text }, {
        headers: {
          "token": localStorage.getItem("token")
        }
      })
      console.log(data)
      socket.emit("send message", data.message)
      toast.success(data.msg)
      setmsg([...msg, data.message])
      settext("")
      setval(!val)
    } catch (err) {
      toast.error("something went wrong try again")
    }
  }
  const fetchChat = async () => {
    try {
      if (selectedChat != null) {
        const { data } = await axios.get(`https://chit-chat-backend-y7u2.onrender.com/message/all/${selectedChat?._id}`, {
          headers: {
            "token": localStorage.getItem("token")
          }
        })
        console.log(data)
        // toast.success(data.msg)
        setmsg(data.data)
        settext("")
        socket.emit('join chat', selectedChat?._id)
      }
    } catch (err) {
      // toast.error("something went wrong try again")
      console.log(err)
    }
  }
  useEffect(() => {
    socket.on("receive message", (data) => {
      console.log(data)
      if (!selectedChatCompare || selectedChat._id !== data.chat._id) {
        if(!notification.includes(data)){
          setnotification([data,...notification])
          setfetchagain(!fetchagain)
        }
      } else {
        setmsg([...msg, data])
      }

    })
  })
  useEffect(() => {
    fetchChat()
  }, [val, selectedChat])
  useEffect(() => {
    fetchChat()
    selectedChatCompare = selectedChat
  }, [])
  return (
    <div className='mr-1 '>
      {
        selectedChat ?
          <div className='flex flex-col justify-end  bg-slate-200  w-full  h-[75vh] rounded-md'>
            <div className='h-[90%] w-full   flex flex-col '>
              <ScrollableFeed>
                {
                  msg?.map((item, i) => {
                    return <Box key={i} display={"flex"} width={"95%"} margin={"2px"}>
                      <div className={`w-full flex ${item?.sender?._id === user?._id ? "justify-end" : "justify-start"}`}>
                        <img className="h-6 w-6 rounded-full m-2" src={item?.sender.pic}></img>
                        <div className={`flex w- flex-col ${item?.sender?._id === user?._id ? "bg-blue-200" : "bg-green-200"} shadow-lg  p-2 rounded-md`}>
                          <span className='text-[12px] opacity-25 font-bold capitalize'>{item?.sender.name}</span>
                          <span>{item?.content}</span>
                        </div>
                      </div>
                    </Box>
                  })
                }

                {msg.length === 0 && <div className='w-full h-full flex justify-center items-center font-bold opacity-25'>No Chats Yet!!</div>}
              </ScrollableFeed>
              {istyping && <span className={`w-full flex text-[12px] font-bold text-pink-500`}>Typing...</span>}
            </div>
            <div className='h-[10%] flex  '>
              
              <input placeholder='enter message ' value={text} className='w-[94%] h-full p-1 border-2'
                onChange={(e) => {
                  settext(e.target.value);
                  if (!socketconnected) { return; };
                  if (!typing) {
                    settyping(true);
                    socket.emit("typing", selectedChat._id)
                  }
                  let lastTypingTime = (new Date()).getTime();
                  var timer=3000
                  setTimeout(()=>{
                    var timeDiff = (new Date()).getTime() - lastTypingTime;
                    if (timeDiff >= timer && typing) {
                      socket.emit("stop typing", selectedChat._id)
                      settyping(false)
                    }
                  },[timer])
                }} />
              <Button className='w-[6%]' variant='contained' onClick={() => handleClick(selectedChat._id)}>Send</Button>
            </div>
          </div> :
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"} height={"100%"}>
            <span className='text-2xl text-pink-400'>Click a user start Chatting </span>
          </Box>
      }
    </div>

  )
}

export default SingleChats
