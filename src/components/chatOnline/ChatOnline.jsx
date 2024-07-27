import React, { useEffect, useState } from "react";
import "./chatOnline.css";
import axios from "axios";
import AvatarUser from "../avatarUser/AvatarUser";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const API = process.env.REACT_APP_SERVER_API;
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(`${API}/users/friends/` + currentId);
      setFriends(res.data);
    };
    getFriends();
  }, [currentId, API]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `${API}/conversations/find/${currentId}/${user._id}`
      );
      console.log(user.username);
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      <hr className="sidebarHr" />
      <h4 className="chatOnlineUsers">
        You can only see online users that you follow
      </h4>
      <hr className="sidebarHr" />
      {onlineFriends.map((o) => {
        return (
          <div
            className="chatOnlineFriend"
            onClick={() => handleClick(o)}
            key={o._id}
          >
            <div className="chatOnlineImgContainer">
              <div className="avatarUser">
                <AvatarUser user={o} />
              </div>
              <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">
              {o?.username || o?.personnelnumber}
            </span>
          </div>
        );
      })}
    </div>
  );
}
