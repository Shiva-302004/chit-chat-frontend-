import { Avatar, Box, Button, Menu, MenuItem, TextField, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import SearchOffIcon from '@mui/icons-material/SearchOff';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { useChat } from '../context/Chatprovider';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TransitionsModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';
import TemporaryDrawer from './Drawer';
const SideDrawer = () => {
  const Router = useNavigate();
  const [search, setsearch] = useState("")
  const [searchresults, setsearchresults] = useState([])
  const [loading, setloading] = useState(false)
  const [Open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorE2)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (idx,chat) => {
    setAnchorEl(null);
    setselectedChat(chat)
    localStorage.setItem("selectedchat", JSON.stringify(chat))
    notification?.splice(idx, 1)
    setnotification(notification)
  };
  const handleClosenew = () => {
    setAnchorEl(null);
  };
  const handleClick2 = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorE2(null);
  };
  const { user, notification ,setnotification, setselectedChat} = useChat()
  return (
    <Box width={"100%"} height={"10%"} display={"flex"} flexDirection={"row"} padding={"3px"} justifyContent={"space-between"} bgcolor={"white"} >
      <Tooltip title="Search Users" className=''>
        <div className='w-15 text-lg h-6 md:w-24 md:text-sm md:h-10 mt-2 md:p-1   rounded-xl'><div className=''><TemporaryDrawer search={search} setsearch={setsearch} toggleDrawer={toggleDrawer} Open={Open} setOpen={setOpen} searchresults={searchresults} setsearchresults={setsearchresults} loading={loading} setloading={setloading} /></div></div>
      </Tooltip>
      <div className='text-lg md:text-xl text-pink-500 font-bold p-2'> Chit-Chat</div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<CircleNotificationsIcon className='w-[32px] h-[32px]' />}
      >
        {notification?.length > 0 && <div className='w-3 h-3 -mx-3 -mt-4 bg-pink-500 rounded-full text-white text-[10px] flex justify-center items-center'>{notification?.length}</div>}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClosenew}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        className='flex flex-col '
      >
        {notification?.length === 0 && <MenuItem>No Notifications</MenuItem>}
        {
          notification?.length!==0 && notification?.map((item, i) => {
            return <MenuItem key={i} onClick={()=>handleClose(i,item.chat)} className='w-44 flex flex-col shadow-lg  p-2 rounded-md bg-slate-300'>
              <span className='text-[12px] opacity-25 font-bold capitalize'>{item?.chat?.isGroupChat?item.chat.chatName:item.sender.name}</span>
              <span>{item?.content}</span>
            </MenuItem>
          })
        }
      </Menu>
      <Button
        id="basic-button"
        aria-controls={open2 ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open2 ? 'true' : undefined}
        onClick={handleClick2}
        endIcon={<ArrowDropDownIcon />}
      >
        <Avatar alt="Remy Sharp" src={user.pic} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorE2}
        open={open2}
        onClose={handleClose2}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <TransitionsModal img={user.pic} name={user.name} email={user.email}>
          <MenuItem></MenuItem>
        </TransitionsModal>
        <MenuItem onClick={() => {
          setAnchorE2(null);
          localStorage.removeItem("User")
          localStorage.removeItem("token")
          Router("/")
        }}>Logout</MenuItem>
      </Menu>

    </Box>

  )
}

export default SideDrawer
