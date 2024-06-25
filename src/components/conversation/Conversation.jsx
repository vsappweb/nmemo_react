import React, { useEffect, useState } from 'react'
import "./conversation.css"
import AvatarUser from '../avatarUser/AvatarUser';
import { HighlightOff } from "@mui/icons-material";
import axios from 'axios';

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);



    const getUser = async () => {
      try {
        // console.log(friendId+"   tetstest")
        const res = await axios("/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
  }, [currentUser, conversation]);


  const conversationDeleteHandler = () => {
    try {
        axios.delete("/conversations/" + conversation._id)
        window.location.reload();
    } catch (err) {
        console.log(err)
    }
}


  return (
    <div className="conversation">
      <div className="conversationUser">
        <div className="avatarUser">
          <AvatarUser user={user} />
        </div>
        <span className="conversationName">{user?.username || user?.personnelnumber}</span>
      </div>
      <HighlightOff className="conversationDelete" onClick={conversationDeleteHandler} />
    </div>
  )
}
