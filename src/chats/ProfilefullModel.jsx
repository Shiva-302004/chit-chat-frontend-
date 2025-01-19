import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    // bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
     borderRadius: "22px",
    backdropFilter: "blur(25px)"
};

export default function TransitionsModal({ children ,user }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
        {
            children?
        
            <div>
                <Button onClick={handleOpen}><div className='flex '> <Button  size='xs' className='h-[35px] w-[10px]  pb-2' startIcon={<RemoveRedEyeIcon className='mb-2'/>} /></div></Button>
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
                        <Box sx={style} display={"flex"} bgcolor={"#aadaec"} justifyContent={"center"} flexDirection={"column"} gap={"10px"} alignItems={"center"}>
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                <Avatar alt="balnk" src={user.pic} className='w-28 h-28' />
                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                                <div className='capitalize font-bold text-pink-400'>{user.name}</div>
                                <div className='text-pink-400 font-semibold'>{user.email}</div>
                            </Typography>
                        </Box>
                    </Fade>
                </Modal>
            </div>:
            <VisibilityIcon/>
}
        </>
    );
}