import "./online.css"
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AvatarUser from "../avatarUser/AvatarUser";

export default function Online({ onlineUsers, currentId }) {
    const API = process.env.REACT_APP_SERVER_API
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);


    //TODO Show all online friends, not just followers
    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get(`${API}/users/friends/` + currentId);
            setFriends(res.data);
        };
        getFriends();
    }, [currentId, API]);

    useEffect(() => {
        setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
    }, [friends, onlineUsers])


    return (
        <div className="chatOnline">
            <h4 className="rightbarTitle">Now online</h4>
            <hr className="sidebarHr" />
            {onlineFriends.map((o) => {
                return (
                    <Link to={"/profile/" + o.personnelnumber} style={{ textDecoration: "none" }} key={o._id} >
                        <div className="chatOnlineFriend">
                            <div className="chatOnlineImgContainer">
                                <div className="avatarUser">
                                    <AvatarUser user={o} />
                                </div>
                                <div className="chatOnlineBadge"></div>
                            </div>
                            <span className="chatOnlineName">{o?.username || o?.personnelnumber}</span>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}