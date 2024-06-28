import React, { useContext, useEffect, useRef, useState } from "react"
import "./messenger.css"
import Topbar from "../../components/topbar/Topbar"
import Conversation from "../../components/conversation/Conversation"
import Message from "../../components/message/Message"
import ChatOnline from "../../components/chatOnline/ChatOnline"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import { io } from "socket.io-client"
import AllUsers from "../../components/allUsers/AllUsers"
import { Group } from "@mui/icons-material";

export default function Messenger() {
    const API = process.env.REACT_APP_SERVER_API
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const socket = useRef()
    const { user } = useContext(AuthContext);
    const [allUsers, setUsers] = useState([]);
    const scrollRef = useRef()
    const [open, setOpen] = useState(false);
    let menuRef = useRef();



    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        }
    });


    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("sendUser", user._id);
        socket.current.on("getUsers", (users) => {
            setOnlineUsers(
                user.followings.filter((f) => users.some((u) => u.userId === f))
            );
        });
    }, [user]);


    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get(`${API}/conversations/` + user._id);
                setConversations(res.data);

            } catch (err) {
                console.log(err);
            }
        }
        getConversations()
    }, [user._id, API])



    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(`${API}/messages/` + currentChat?._id);
                setMessages(res.data)
            } catch (err) {
                console.log(err)
            }
        };
        getMessages()
    }, [currentChat, API]);

    const handleClickNewConversation = async (newReceiver) => {
        const newConversation = {
            senderId: user._id,
            receiverId: newReceiver._id,
        };
        try {
            await axios.post(`${API}/conversations`, newConversation);
            window.location.reload();
        } catch (err) {
            console.log(err)
        }


    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        const receiverId = currentChat.members.find((member) => member !== user._id);

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
        });

        try {
            const res = await axios.post(`${API}/messages`, message);
            setMessages([...messages, res.data])
            setNewMessage("")
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axios.get(`${API}/users/usersList`);
                setUsers(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUsers()
    }, [API]);

    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <div className="chatMenuAddNew" >
                            <button className="chatMenuBtn" onClick={() => { setOpen(!open) }}><Group style={{ marginRight: "10px" }} />Start new conversation</button>
                            <div className={`chatMenuDropdown ${open ? 'active' : 'inactive'}`}  >
                                <div className="chatMenuDropdownInner" ref={menuRef}>
                                    <ul>
                                        {Object.values(allUsers).map((newReceiver) => {

                                            return (
                                                <div onClick={() => handleClickNewConversation(newReceiver)} key={newReceiver._id} >
                                                    {/* //TODO delete from list users how have conversation */}
                                                    {newReceiver.role === 404 || newReceiver._id === user._id ?
                                                        <>
                                                        </>
                                                        :
                                                        <>
                                                            <AllUsers user={newReceiver} />
                                                        </>}
                                                </div>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* <div className="chatMenuAllUsers">
                            {Object.values(allUsers).map((newReceiver) => {
                                return (
                                    <div onClick={() => handleClickNewConversation(newReceiver)} key={newReceiver._id} >
                                        {newReceiver.role === 404 ?
                                            <>
                                            </>
                                            :
                                            <>
                                                <AllUsers user={newReceiver} />
                                            </>}
                                    </div>
                                )
                            })}
                        </div> */}

                        {conversations.map((c) => {
                            return (
                                <div onClick={() => setCurrentChat(c)} key={c._id}>
                                    <Conversation conversation={c} currentUser={user} />
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ? (
                            <>
                                {/* //TODO add the name of the user you are chatting with */}
                                <div className="chatBoxTop">
                                    {messages.map((m) => (
                                        <div ref={scrollRef}>
                                            <Message message={m} own={m.sender === user._id} key={m._id} />
                                        </div>
                                    ))}
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea className="chatMessageInput"
                                        placeholder="Write something..."
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        value={newMessage}
                                    ></textarea>
                                    <button className="chatSubmitButton" onClick={handleSubmit}>
                                        Send
                                    </button>
                                </div>
                            </>
                        ) : (
                            <span className="noConversationText">Open a conversation to start a chat.</span>)}
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat} />
                    </div>
                </div>
            </div >
        </>
    )
}
