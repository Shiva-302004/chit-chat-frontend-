import { Skeleton, Stack } from '@mui/material'
import React from 'react'

const ChatLoading = () => {
  return (
    <div>
      <Stack direction={"column"}>
        <Skeleton width={"100%"} height={"20%"}  className='bg-[grey] p-4'/>
        <Skeleton width={"100%"} height={"20%"}  className='bg-[grey] p-4'/>
        <Skeleton width={"100%"} height={"20%"}  className='bg-[grey] p-4'/>
        <Skeleton width={"100%"} height={"20%"}  className='bg-[grey] p-4'/>
        <Skeleton width={"100%"} height={"20%"}  className='bg-[grey] p-4'/>
        <Skeleton width={"100%"} height={"20%"}  className='bg-[grey] p-4'/>
        <Skeleton width={"100%"} height={"20%"}  className='bg-[grey] p-4'/>
        <Skeleton width={"100%"} height={"20%"}  className='bg-[grey] p-4'/>
        <Skeleton width={"100%"} height={"20%"}  className='bg-[grey] p-4'/>
        <Skeleton width={"100%"} height={"20%"}  className='bg-[grey] p-4'/>
    </Stack>
    </div>
  )
}

export default ChatLoading
