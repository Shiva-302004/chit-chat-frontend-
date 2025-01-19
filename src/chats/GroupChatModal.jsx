import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import { TextField } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect } from 'react';
import SerchList from './SerchList';
import { useChat } from '../context/Chatprovider';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function GroupModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [name, setname] = React.useState("");
    const [search, setsearch] = React.useState("");
    const [searchresults, setsearchresults] = React.useState([]);
    const [userinfo, setuserinfo] = React.useState([])
    const [users, setusers] = React.useState([])
    const [loading, setloading] = React.useState(false)
    const { user, setchats, chats } = useChat()
    const setItem = (userId, item) => {
        if (!users.includes(userId)) {
            setusers([...users, userId])
            setuserinfo([...userinfo, item])
        }
        if (!users.includes(user?._id)) {
            setusers([...users, user._id])
        }
        console.log(users)
        console.log(userinfo)
    }
    const handleClick = async () => {

        try {
            setloading(true)
            const data = await axios(`http://localhost:8000/user/Allusers?name=${search}`, {
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                }
            })

            console.log(data.data)
            if (data.data.success) {
                setsearchresults(data.data.data)
            } else {
                return toast.error(data.data.msg)
            }
            setloading(false)
        } catch (err) {
            console.log(err)
        }
    }
    const handleSubmit = async () => {
        try {
            const data = await axios.post("http://localhost:8000/chats/group", { name: name, users: JSON.stringify(users) }, {
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                }
            })
            console.log(data)
            setchats([...chats, data.data.chat])

            setOpen(false)
        } catch (err) {
            toast.error("something went wrong")
        }
    }
    useEffect(() => {
        handleClick()
    }, [search.length])

    return (
        <div>
            <Button onClick={handleOpen} startIcon={<AddIcon />}>Add Group</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='overflow-scroll '
            >
                <Box  width={"80vw"} sx={style} display={"flex"} overflow={"scroll"} flexDirection={"column"} gap={"4px"} justifyContent={"center"} alignItems={"center"}>
                    <Typography fontWeight={"bold"} fontSize={"32px"} color={"pink"}>Create New Group Chat</Typography>
                    <TextField className='w-full' placeholder='Chat Name' value={name} onChange={(e) => setname(e.target.value)}></TextField>
                    <TextField className='w-full' placeholder='Search users' value={search} onChange={(e) => setsearch(e.target.value)}></TextField>
                    <Box width={"100%"} height={"10%"} display={"flex"}>
                        {
                            userinfo?.map((item, i) => {
                                return <div key={i} className=' mx-3 w-fit px-2 py-1 bg-slate-300 text-pink-400 shadow-2xl border-2'>{item.name}</div>
                            })
                        }
                    </Box>
                    <Box width={"100%"} height={"15%"}>
                        {
                            searchresults?.slice(0, 2).map((item, i) => {
                                return <SerchList key={i} user={item} handlefunction={() => { setItem(item._id, item) }} />
                            })
                        }
                    </Box>
                    <Button variant='contained'  onClick={handleSubmit}>Create Group</Button>
                </Box>
            </Modal>
        </div>
    );
}
