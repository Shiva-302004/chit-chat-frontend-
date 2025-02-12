import { Button, Input } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const VerifyUser = () => {
    const router=useNavigate()
    const params=useParams()
    useEffect(()=>{
        const user= JSON.parse(localStorage.getItem("User"))
        if(user){
          if(user?.verified)router("/chats")
        } else{
          router("/")
        } 
    },[])
    const [otp,setotp]=useState("")
    const [countdown,setcoundown]=useState(30)
    const [isclick,setisclick]=useState(false)
    const handleclick=async(id)=>{
      setisclick(true);
      setcoundown(30)
      const interval=setInterval(()=>{
        setcoundown((prev)=>{
            if(prev==1){
              clearInterval(interval)
              setisclick(false)
              return 30
            }
            return prev-1
        })
      },1000)
      console.log(params.id+"hi")
      if(id){
        const {data}=await axios.post("https://chit-chat-backend-y7u2.onrender.com/otp/",{email:params.id},{headers:{
          "Content-Type":"application/json",
          "token":localStorage.getItem("token")
        }})
        console.log(data)
        if(data.msg==="user not registered"){
          localStorage.removeItem("User");
          localStorage.removeItem("token");router("/");localStorage.removeItem("selectedchat");localStorage.removeItem("chats")
          return toast.success(data.msg)
        }else if(data.success){
            return toast.success(data.msg)
        }
        else{
          return toast.error(data.msg)
        }
      }else{
        return toast.error("something went wrong try again")
      }
    }
    const handlesubmit=async()=>{
      if(otp.length==0 || otp.length<6){
        return toast.error("please eneter a correct otp")
      }
      const {data}=await axios.post("https://chit-chat-backend-y7u2.onrender.com/otp/verify",{otp:otp,email:params.id},{headers:{
        "Content-Type":"application/json",
        "token":localStorage.getItem("token")
      }})
      console.log(data)
      if(data.success){
        localStorage.setItem("User",JSON.stringify(data.User))
        router("/chats")
        return toast.success(data.msg)
      }else{
        return toast.error(data.msg)
      }
    }
  return (
    <div className='w-full h-full flex flex-col gap-16 justify-center items-center'>
      <div className='bg-white h-40 w-48 rounded-lg shadow-xl flex flex-col p-2'>
        <span className='w-full text-pink-300 flex  justify-center mb-2'>Verification</span>
        <Input className='border-2' value={otp} onChange={(e)=>setotp(e.target.value)} placeholder='enter otp'/>
        {isclick?<span className='w-full flex justify-center text-sm'>resend otp in {countdown}</span>:<Button variant='outlined' color='secondary' onClick={()=>handleclick(params.id)}>Send otp</Button>}
        <Button className='mt-2' variant='contained' onClick={()=>handlesubmit()}>Verify User</Button>
      </div>
      <Button className='mt-2' variant='contained' onClick={()=>{localStorage.removeItem("User");
          localStorage.removeItem("token");router("/");localStorage.removeItem("selectedchat")}}>Logout</Button>
    </div>
  )
}

export default VerifyUser