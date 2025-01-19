import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Chat from './components/Chat'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UseAnimations from "react-useanimations";
function App() {
  return (
    <div className='app overflow-x-hidden w-[100vw] '>
      
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chats' element={<Chat />} />
      </Routes>
    </div>
  )
}

export default App
