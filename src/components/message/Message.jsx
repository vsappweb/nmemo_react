import React, { useEffect, useState } from "react"
import "./message.css"
import { format } from "timeago.js"
import AvatarUser from "../avatarUser/AvatarUser"
import axios from "axios"

export default function Message({ message, own }) {
    const API = process.env.REACT_APP_SERVER_API
    const [user, setUser] = useState([])

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`${API}/users?userId=` + message.sender);
                setUser(res.data)
            } catch (err) {
                console.log(err)
            }
        };
        getUser()
    }, [message, API]);

    return (
        <div className={own ? "message own" : "message"}>
            {own ? <div className="messageTop" style={{ position: "relative" }}>
                <p className="messageText">{message.text}</p>
                <svg className="messageImgUsername" width="125" height="125" xmlns="http://www.w3.org/2000/svg">
                    <g transform="rotate(-15,62,62)">
                        <path  fill="none" stroke-width="none" id="textPath" d="M10,50 a40,40 0 1,1 0,60" />
                        <text><textPath stroke="green" href="#textPath" startOffset="20"><tspan dy=".8em">{own ? "You" : user.username}</tspan></textPath>
                        </text>
                    </g>
                </svg>
                <div className="avatarUser messageImg">
                    <AvatarUser user={user}  />
                </div>
            </div>
            :
            <div className="messageTop" style={{ position: "relative" }}>
                <div className="avatarUser">
                    <AvatarUser user={user}  />
                </div>
                <svg className="messageImgUsername" width="125" height="125" xmlns="http://www.w3.org/2000/svg">
                    <g transform="rotate(-15,62,62)">
                        <path  fill="none" stroke-width="none" id="textPath" d="M10,50 a60,37 0 1,1 0,60" />
                        <text><textPath stroke="grey" stroke-width="1" href="#textPath" startOffset="20"><tspan dy=".8em">{own ? "You" : user.username}</tspan></textPath>
                        </text>
                    </g>
                </svg>
                <p className="messageText">{message.text}</p>
            </div>}
            <div className="messageBottom">{format(message.createdAt)}</div>

        </div>
    )
}
