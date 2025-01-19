import { Avatar, Box, Stack, Typography } from '@mui/material'
import React from 'react'

const SerchList = ({handlefunction,user}) => {
  return (
    <div className='w-[90%] h-[20%] m-2 p-2 bg-slate-300 hover:bg-yellow-100 border-2 shadow-2xl rounded-lg' onClick={handlefunction}>
        <Stack direction={"row"} display={'flex'} alignItems={"center"}>
        <Avatar alt='blank' src={user.pic}/>
        <Stack direction={"column"} padding={"2px"} margin={"2px"}>
            <Typography fontWeight={"bold"} color={"black"} margin={"2px"} className='font-md capitalize'>{user.name}</Typography>
            <span className='text-[16px]'>{user.email}</span>
        </Stack>
        </Stack>
    </div>
  )
}

export default SerchList
