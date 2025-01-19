import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    // bgcolor: 'background.paper',
    border: '2px ',
    boxShadow: 24,
    p: 4,
    borderRadius: "22px",
    backdropFilter: "blur(25px)"
};

export default function TransitionsModal({ img, name, email, children }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            {
                children ?

                    <div>
                        <Button onClick={handleOpen}>Profile</Button>
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
                                <Box sx={style} bgcolor={"#aadaec"}  display={"flex"} justifyContent={"center"} flexDirection={"column"} gap={"10px"} alignItems={"center"}>
                                    <Typography id="transition-modal-title" >
                                        <Avatar  alt="balnk" src={img} className='w-44 h-44' />
                                    </Typography>
                                    <Typography id="transition-modal-description" sx={{ mt: 2 }} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                                        <div className='capitalize font-bold text-pink-400'>{name}</div>
                                        <div className='text-pink-400 opacity-40 font-semibold'>{email}</div>
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