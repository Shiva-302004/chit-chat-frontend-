import React, { useEffect, useState } from 'react'
import Container from "@mui/material/Container"
import { Box, Button, Stack, TextField } from '@mui/material'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import axios from 'axios'
import {  useFormik } from "formik"
import * as yup from "yup"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  useEffect(()=>{
      if(localStorage.getItem("token")){
        router("/chats")
      }
  },[])
  const router=useNavigate()
  const [value, setvalue] = useState("login");
  const [show,setshow]=useState(false)
  const [show1,setshow1]=useState(false)
  const [show2,setshow2]=useState(false)
  const [image,setimage]=useState(null)
  const [signup,setsignup]=useState({
    name:"",
    email:"",
    pic:"",
    password:"",
    confirmpassword:""
  })
  const handlechange=(e)=>{
    setsignup({...signup,[e.target.name]:e.target.value})
    console.log(signup)
  }
  const handleChange = (e, newvalue) => {
    setvalue(newvalue)
  }
  const handleClick=async()=>{
    if(signup.confirmpassword===signup.password){
      const formdata=new FormData()
      formdata.append("image",image)
      const imageurl=await axios.post('https://chit-chat-backend-y7u2.onrender.com/user/image',formdata)
      console.log(imageurl)
      if(imageurl.data.success){
        setsignup({...signup,pic:imageurl.data.result})
        
        const user=await axios.post('https://chit-chat-backend-y7u2.onrender.com/user/signup',{
          name:signup.name,
          pic:imageurl.data.result,
          password:signup.password,
          email:signup.email
        })
        console.log(signup)
        console.log(user.data.user)
        toast.success(user.data.msg)

        localStorage.setItem("token",user.data.token)
        localStorage.setItem("User",JSON.stringify(user.data.user))
        router("/chats")
      }else{
        toast.error(imageurl.data.msg)
      }
    }
  }
  
  const formik = useFormik({
    initialValues: { email: "", password: "" },

    validationSchema: yup.object({
      email: yup.string().email("enter a valid email").required("email is required"),
      password: yup.string().min(4, "password length should be greater than 4").required("password is required")
    }),

    onSubmit: async(values) => {
      const data=await axios.post("http://localhost:8000/user/login",values)
      console.log(data.data)
      if(data.data.success){
        toast.success(data.data.msg)
        localStorage.setItem("token",data.data.token)
        localStorage.setItem("User",JSON.stringify(data.data.user))
        router("/chats")
      }else{
        toast.error(data.data.msg)
      }
    }
  })
  
  
  return (
    <Container maxWidth="md" className='py-[0.5%]'>
      <Box bgcolor={"white"} className='flex justify-center items-center p-2 text-4xl font-bold text-pink-500 rounded-md hover:bg-slate-200'>
        Chit-Chat
      </Box>
      <Box  bgcolor={""} className='bg-pink-100 flex flex-col justify-center items-center p-2 my-4 w-full'>
        <TabContext value={value}>
          <Box width={"80%"} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Login" value="login" />
              <Tab label="Signup" value="signup" />
            </TabList>
          </Box>
          <TabPanel value="login" className='w-[100%]'>
            <Box width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
              <form className='w-full' onSubmit={formik.handleSubmit}>
                <Box width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
                  <Box width={"100%"} display={"flex"} flexDirection={"column"} padding={"3px"}>
                    <label htmlFor="email">Email</label>
                    <TextField 
                    name="email" 
                    type="email" 
                    value={formik.values.email} 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur} 
                    error={formik.touched.email&&Boolean(formik.errors.email)}
                    helperText={formik.touched.email&& formik.errors.email}
                    />
                  </Box>
                  <Box width={"100%"} display={"flex"} flexDirection={"column"} padding={"3px"}>
                    <label htmlFor="password">Password</label>
                    <Stack spacing={3} direction={"row"} width={"100%"} className='w-full'>
                    <TextField 
                    className='w-full'
                    name="password" 
                    type={show?"text":"password"} 
                    value={formik.values.password} 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur} 
                    error={formik.touched.password&&Boolean(formik.errors.password)}
                    helperText={formik.touched.password&& formik.errors.password}
                    />
                    <Button variant='contained' color='secondary' onClick={()=>setshow(!show)}>{show?"hide":"show"}</Button>
                    </Stack>
                  </Box>
                  <Button type='submit' variant='contained' color='error' className='mt-6'>Login</Button>
                </Box>
              </form>
            </Box>
          </TabPanel>
          <TabPanel value="signup" className='w-full flex flex-col gap-4' >
              <TextField type='text' name='name' value={signup.name} onChange={handlechange} className='w-full p-2' placeholder='name'></TextField>
              <TextField type="email" name='email' value={signup.email} onChange={handlechange} className='w-full p-2' placeholder='email'></TextField>
              <Stack direction={"row"} spacing={3} width={"100%"}>
              <TextField type={show1?"text":"password"} name='password' value={signup.password} onChange={handlechange} className='w-full p-2' placeholder='password'></TextField>
              <Button variant='contained' color='secondary' onClick={()=>setshow1(!show1)}>{show1?"hide":"show"}</Button>
              </Stack>
              <Stack  direction={"row"} spacing={3} width={"100%"}>

              <TextField type={show2?"text":"password"} name='confirmpassword' value={signup.confirmpassword} onChange={handlechange} className='w-full p-2' placeholder='confirm password'></TextField>
              <Button variant='contained' color='secondary' onClick={()=>setshow2(!show2)}>{show2?"hide":"show"}</Button>
              </Stack>
              <input type="file"  name='image'  onChange={(e)=>setimage(e.target.files[0])}/>
              {
                image?<Box width={"80px"} height={"80px"}><img src={URL.createObjectURL(image)} alt='blank'></img></Box>:<></>
              }
              <Button variant='contained' onClick={handleClick} color='error'>Signup</Button>
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  )
}

export default Home
