import "./postTlToLine.css";
import AvatarUser from "../avatarUser/AvatarUser";
import { HighlightOff, MoreVert, Edit, DoNotTouch, MarkEmailRead, MarkEmailUnread } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";

export default function PostTlToLine({ tlToLine }) {
    const API = process.env.REACT_APP_SERVER_API
    // const [like, setLike] = useState(tlToLine.likes.length);
    const [isReaded, setIReaded] = useState(tlToLine.isRead.length);
    // const [isLiked, setIsLiked] = useState(false);
    const [isIReadd, setIsIReadd] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    
    // useEffect(() => {
    //     setIsLiked(tlToLine.likes.includes(currentUser._id));
    // }, [currentUser._id, tlToLine.likes]);

    useEffect(() => {
        setIsIReadd(tlToLine.isRead.includes(currentUser._id));
    }, [currentUser._id, tlToLine.isRead]);
    

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`${API}/users?userId=${tlToLine.userId}`)
            setUser(res.data)
        };
        fetchUser();
    }, [tlToLine.userId, API]);

    const tlToLineDeleteHandler = () => {
        try {
            axios.delete(`${API}/tlToLines/` + tlToLine._id)
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    }


    // const likeHandler = () => {
    //     try {
    //         axios.put("/tlToLines/" + tlToLine._id + "/like", { userId: currentUser._id })
    //     } catch (err) {
    //     }
    //     setLike(isLiked ? like - 1 : like + 1)
    //     setIsLiked(!isLiked)
    // }

    const isReadHandler = () => {
        try {
            axios.put(`${API}/tlToLines/` + tlToLine._id + "/isRead", { userId: currentUser._id })
        } catch (err) {
        }
        setIReaded(isIReadd ? isReaded - 1 : isReaded + 1)
        setIsIReadd(!isIReadd)
    }


    return (
        <div className="postTlToLine">
            <div className="postTlToLineWrapper">
                <div className="postTlToLineTop">
                    <div className="postTlToLineTopLeft">
                        <Link to={`profile/${user.personnelnumber}`}>
                        <div className="avatarUser">
                            <AvatarUser user={user} />
                        </div>
                        </Link>
                        <span className="postTlToLinePersonnelnumber">{user.username || user.personnelnumber}</span>
                        <span className="postTlToLineDate">{format(tlToLine.createdAt)}</span>
                    </div>
                    <div className="postTlToLineTopRight">
                        <span className="postTlToLineTitle">{tlToLine?.title}</span>
                        {isMenuOpen && <div className="postTopEditDel">

{tlToLine.userId === currentUser._id ?
    <div className="editDeleteBtns">
        <div className="notActiveBtn">
            <Edit onClick={() => setIsMenuOpen(!isMenuOpen)} />
        </div>
        <div className="deleteBtn">
            <HighlightOff onClick={tlToLineDeleteHandler} />
        </div>
    </div>
    :
    <div className="deleteBtn">
        <DoNotTouch onClick={() => setIsMenuOpen(!isMenuOpen)} />
    </div>
}
</div>}
<MoreVert className="postMenu" style={{ cursor: "pointer" }} onClick={() => setIsMenuOpen(!isMenuOpen)} />
                        {/* <MoreVert />
                        {tlToLine.userId === currentUser._id ? <HighlightOff className="postTlToLineDelete" onClick={tlToLineDeleteHandler} />
                        :<AddComment />} */}
                    </div>
                </div>
                <div className="postTlToLineCenter">
                    <span className="postTlToLineText">{tlToLine?.desc}</span>
                    <img className="postTlToLineImg" src={PF + tlToLine.img} alt="" />
                </div>
                <div className="postTlToLineBottom">
                    <div className="postTlToLineBottomLeft">
                        {/* <ThumbUpOffAlt className="likeIcon" onClick={likeHandler}/>
                        <span className="postTlToLineLikeCounter">{like} people like it</span> */}
                        {isReaded > 0 ? <MarkEmailRead className="likeIcon" onClick={isReadHandler}/> : <MarkEmailUnread className="likeIcon" onClick={isReadHandler}/>}
                        <span className="postTlToLineLikeCounter">{isReaded} people isRead it</span>
                    </div>
                    {/* <div className="postTlToLineBottomRight">
                        <span className="postTlToLineCommentText">{postTlToLine.comment} comments</span>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
