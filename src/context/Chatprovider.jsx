import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext(null);

const ChatProvider = ({ children }) => {
    const [chat, setChat] = useState("shiva");
    const [user, setuser] = useState({ name: "", email: "", password: "", pic: "" ,_id:""})
    const [chats, setchats] = useState([])
    const [selectedChat, setselectedChat] = useState([])
    const [loggeduser, setloggeduser] = useState({ name: "", email: "", pic: "" })
    const [notification, setnotification] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/")
        } else {
            setuser((JSON.parse(localStorage.getItem("User"))))
        }
    }
        , [navigate])
    useEffect(()=>{
        if(!localStorage.getItem("selectedchat")){
            setselectedChat(null)
        }else{
            setselectedChat(JSON.parse(localStorage.getItem("selectedchat")))
        }
    },[])
    useEffect(()=>{
        if(localStorage.getItem("User")){
            setuser(JSON.parse(localStorage.getItem("User")))
        }
    },[])
    return (
        <ChatContext.Provider value={{notification,setnotification,loggeduser, setloggeduser, chat, setChat, user, setuser, chats, setchats, selectedChat, setselectedChat }}>
            {children}
        </ChatContext.Provider>
    );
}
export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
}

export default ChatProvider;
