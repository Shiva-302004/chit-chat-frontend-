// import React from 'react'
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useChat } from '../context/Chatprovider';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { toast } from 'react-toastify';
import SerchList from './SerchList';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const GroupProfileModal = ({ children, fetchagain, setfetchagain }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { user, selectedChat, setselectedChat } = useChat()
    const [groupchatname, setgroupchatname] = React.useState(selectedChat.chatName)
    // const [search, setsearch] = React.useState()
    const [searchResults, setsearchResults] = React.useState()
    const handleremove = async(userid,grpid) => {
        if(selectedChat.groupAdmin._id!==user._id){
            toast.error("only admin can remove user form group")
            return;
        }
        try{
            const {data}=await axios.put("https://chit-chat-backend-y7u2.onrender.com/chats/removefromgroup",{chatId:grpid,userId:userid},{headers:{
                "type":"application/json",
                "token":localStorage.getItem("token")
            }})
            console.log(data)
            if(data.success){
                toast.success(data.msg)
                setselectedChat(data.data)
                localStorage.setItem("selectedchat",JSON.stringify(data.data))
                setfetchagain(!fetchagain)
            }
        }catch(err){
            toast.error("something went wrong while removing user try again")
        }
        
    }
    const handlerename = async (id) => {
        const { data } = await axios.put("https://chit-chat-backend-y7u2.onrender.com/chats/rename", { grpId: id, chatname: groupchatname }, {
            headers: {
                "type": "application/json",
                "token": localStorage.getItem("token")
            }
        })
        console.log(data)
        if (data.success) {
            setselectedChat(data.newdata)
            localStorage.setItem("selectedchat", JSON.stringify(data.newdata))
            setfetchagain(!fetchagain)
        }
        setgroupchatname("")
        setOpen(!open)
    }
    const handlesearch = async (search) => {
        try {
            // setloading(true)
            const data = await axios(`https://chit-chat-backend-y7u2.onrender.com/user/Allusers?name=${search}`, {
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                }
            })

            console.log(data.data)
            if (data.data.success) {
                setsearchResults(data.data.data)
            } else {
                return toast.error(data.data.msg)
            }
            // setloading(false)
        } catch (err) {
            console.log(err)
        }
    }
    const addtogroup=async (item,userid,grpid)=>{
        if(selectedChat.groupAdmin._id!==user._id){
            toast.error("only admin can add user form group")
            return;
        }
        try{
            const chat=JSON.parse(localStorage.getItem("selectedchat"))
            var bol=false;
            for(var i=0;i<chat.users.length;i++){
                if(chat.users[i]._id===userid){
                    bol=true;
                    break;
                }
            }
            if(bol){
                return;
            }else{
                const {data}=await axios.put("https://chit-chat-backend-y7u2.onrender.com/chats/addtogroup",{chatId:grpid,userId:userid},{headers:{
                    "type":"application/json",
                    "token":localStorage.getItem("token")
                }})
                console.log(data)
                // if(data.success){
                    toast.success(data.msg)
                    setselectedChat(data.data)
                    localStorage.setItem("selectedchat",JSON.stringify(data.data))
                    setfetchagain(!fetchagain)
                // }
            }
            
        }catch(err){
            toast.error("something went wrong")
        }
           
        }
    return (
        <>
            {
                children ?

                    <div>
                        <Button onClick={handleOpen}><div className='flex '> <Button size='xs' className='h-[35px] w-[10px]  pb-2' startIcon={<RemoveRedEyeIcon className='mb-2' />} /></div></Button>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            slots={{ backdrop: Backdrop }}
                            slotProps={{
                                backdrop: {
                                    timeout: 500,
                                },
                            }}
                        >
                            <Fade in={open}>
                                <Box sx={style} display={"flex"} flexDirection={"column"} gap={"10px"} alignItems={"center"}>
                                    <Typography id="transition-modal-title" variant="h6" component="h2">
                                        <Avatar alt="balnk" src={selectedChat.pic} className='w-28 h-28' />
                                    </Typography>
                                    <Typography id="transition-modal-description" width={"100%"} sx={{ mt: 2 }} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                                        <div className='capitalize font-bold text-pink-400'>{selectedChat.chatName}</div>
                                        {/* <div className='text-pink-400 font-semibold'>{user.email}</div> */}
                                        <div className='flex flex-wrap w-full mt-3'>
                                            {selectedChat ? selectedChat.users.map((item, i) => {
                                                return <div className='flex flex-row justify-around mx-2 mt-2 items-center p-[3px] bg-pink-200 text-black rounded-md' key={i}>
                                                    <Avatar alt="balnk" src={item.pic} className='w-[12px] h-[12px]' />
                                                    <div className='ml-3'>{item.name}</div>
                                                    <Button startIcon={<CloseIcon />} onClick={() => handleremove(item._id,selectedChat._id)}></Button>
                                                </div>
                                            }) : <></>}
                                        </div>
                                        <Box display={"flex"} flexDirection={"row"} mt={"10px"} width={"100%"}>
                                            <TextField className='w-[80vw]' onChange={(e) => setgroupchatname(e.target.value)} />
                                            <Button onClick={() => handlerename(selectedChat._id)} variant='contained'>Update</Button>
                                        </Box>
                                        <Box display={"flex"} width={"100%"} flexDirection={"column"} mt={"10px"} >
                                            <TextField placeholder='type to add search new user' onChange={(e) => handlesearch(e.target.value)} />
                                            <Box width={"100%"} height={"20%"}>
                                                {
                                                    searchResults?.slice(0, 3).map((item, i) => {
                                                        return <SerchList key={i} user={item} handlefunction={() => {addtogroup(item,item._id,selectedChat._id) }} />
                                                    })
                                                }
                                            </Box>
                                        </Box>
                                    </Typography>
                                </Box>
                            </Fade>
                        </Modal>
                    </div> :
                    <VisibilityIcon />
            }
        </>
    );

}

export default GroupProfileModal
