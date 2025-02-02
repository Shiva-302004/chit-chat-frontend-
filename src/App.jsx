import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Chat from './components/Chat'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UseAnimations from "react-useanimations";
import VerifyUser from './components/verifyuser';
function App() {
  return (
    <div className='app overflow-x-hidden w-[100vw] '>
      
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chats' element={<Chat />} />
        <Route path="/user/:id" element={<VerifyUser/>}/>
      </Routes>
    </div>
  )
}

export default App
