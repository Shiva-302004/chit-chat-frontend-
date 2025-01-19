import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { toast } from 'react-toastify';
import ChatLoading from './ChatLoading';
import SerchList from './SerchList';
import { useChat } from '../context/Chatprovider';
export default function TemporaryDrawer({setloading,loading,searchresults,setsearchresults,Open, setOpen,toggleDrawer,search,setsearch}) {
    const {chats,setchats,setselectedChat}=useChat()
    const accessChat=async(userId)=>{
        try{
            const {data}=await axios.post("http://localhost:8000/chats/",{"userId":userId},{headers:{
                "Content-Type":"application/json",
                "token":localStorage.getItem("token")||null
            }})
            if(!chats.find(item=>item._id===data.data._id)) setchats([data,...chats])
            setselectedChat(data.data)
            console.log(data)
        }catch(err){
            console.log(err)
            toast.error("error while selecting chats")
        }
    }
    const handleClick=async(search)=>{
        if(search.length===0){
           return  toast.error("please enter something")
        }
            try{
                setloading(true)
                const data=await axios(`http://localhost:8000/user/Allusers?name=${search}`,{
                    headers:{
                        "Content-Type":"application/json",
                        "token":localStorage.getItem("token")
                    }
                })
                
                console.log(data.data)
                if(data.data.success){
                    setsearchresults(data.data.data)
                }else{
                    return toast.error(data.data.msg)
                }
                setloading(false)
            }catch(err){
                console.log(err)
            }
    }
  const DrawerList = (
    <Box sx={{ width: 300 }} role="presentation" >
        <div className='flex w-full justify-end p-2'>
            <Button variant='outlined'  className='' onClick={toggleDrawer(false)}><CloseIcon/></Button>
        </div>
      <List>
        <ListItem><TextField value={search} onChange={(e)=>setsearch(e.target.value)}/> <Button onClick={()=>handleClick(search)}> Go</Button></ListItem>
        {loading? <ChatLoading/>:(
            searchresults?.map((item)=>{
                return <SerchList key={item._id} user={item} handlefunction={()=>accessChat(item._id)}/>
            })
        )}
      </List>
    </Box>
  );

  return (
    <div >
      <Button className='' onClick={toggleDrawer(true)}>Search</Button>
      <Drawer open={Open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}