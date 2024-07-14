import "./postGmTools.css";
import AvatarUser from "../avatarUser/AvatarUser";
import { DoNotTouch, HighlightOff, MoreVert, Edit } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";

export default function PostGmTools({ gmTool }) {
    const API = process.env.REACT_APP_SERVER_API
    const { user: currentUser } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const res = await axios.get(`${API}/users?userId=${post.userId}`)
    //         setUser(res.data)
    //     };
    //     fetchUser();
    // }, [post.userId, API]);

    const postDeleteHandler = () => {
        try {
            axios.delete(`${API}/gmTools/` + gmTool._id)
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    }




    return (
        <div className="postGmTools">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <span className="postGmToolsTitle" style={{color:"blue"}}>{gmTool?.toolNumber}</span>
                    </div>
                    <div className="postTopRight">
                        <span className="postDate">{gmTool.date} {format(gmTool.createdAt)}</span>
                        {isMenuOpen && <div className="postTopEditDel">

                            {gmTool?.userId === currentUser._id ?
                                <div className="editDeleteBtns">
                                    <div className="notActiveBtn">
                                        <Edit onClick={() => setIsMenuOpen(!isMenuOpen)} />
                                    </div>
                                    <div className="deleteBtn" onClick={postDeleteHandler} >
                                        <HighlightOff />
                                    </div>
                                </div>
                                :
                                <div className="deleteBtn">
                                    <DoNotTouch onClick={() => setIsMenuOpen(!isMenuOpen)} />
                                </div>
                            }
                        </div>}
                        <MoreVert className="postMenu" style={{ cursor: "pointer" }} onClick={() => setIsMenuOpen(!isMenuOpen)} />
                    </div>
                </div>
                <div className="postCenter">
                    <h3 className="postGmToolsTitle" style={{color:"orangered"}}>Problem was: <span style={{color:"red", textDecoration:"underline", fontWeight:"bold"}}>{gmTool?.problems}</span></h3>
                    <span className="postText">{gmTool?.problem}</span>
                    <br />
                    <br />

                    <h3 className="postGmToolsTitle" style={{color:"green"}}>How we fixed it:</h3>
                    <span className="postText">{gmTool?.howFixed}</span>
                    
                </div>
            </div>
        </div>
    )
}
