import "./postMemo.css";
import AvatarUser from "../avatarUser/AvatarUser";
import { HighlightOff, Edit, DoNotTouch, MoreVert } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";

export default function PostMemo({ memo }) {
    const API = process.env.REACT_APP_SERVER_API
    const [like, setLike] = useState(memo.likes.length);
    const [love, setLove] = useState(memo.loves.length);
    const [isLiked, setIsLiked] = useState(false);
    const [isLoved, setIsLoved] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const date = new Date();

    
    useEffect(() => {
        setIsLiked(memo.likes.includes(currentUser._id));
    }, [currentUser._id, memo.likes]);

    useEffect(() => {
        setIsLoved(memo.loves.includes(currentUser._id));
    }, [currentUser._id, memo.loves]);
    

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`${API}/users?userId=${memo.userId}`)
            setUser(res.data)
        };
        fetchUser();
    }, [memo.userId, API]);

    const memoDeleteHandler = () => {
        try {
            axios.delete(`${API}/memos/` + memo._id)
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    }


    const likeHandler = () => {
        try {
            axios.put(`${API}/memos/` + memo._id + "/like", { userId: currentUser._id })
        } catch (err) {
        }
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
    }

    const loveHandler = () => {
        try {
            axios.put(`${API}/memos/` + memo._id + "/love", { userId: currentUser._id })
        } catch (err) {
        }
        setLove(isLoved ? love - 1 : love + 1)
        setIsLoved(!isLoved)
    }


    return (
        <div className="postMemo">
            <div className="postMemoWrapper">
                <div className="postMemoTop">
                    <div className="postMemoTopLeft">
                        <Link to={`profile/${user.personnelnumber}`}>
                        <div className="avatarUser">
                            <AvatarUser user={user} />
                        </div>
                        </Link>
                        <span className="postMemoPersonnelnumber">{user.username || user.personnelnumber}</span>
                        <span className="postMemoDate">{format(memo.createdAt)}</span>
                    </div>
                    <div className="postMemoTopRight">
                        <span className="postMemoTitle">{memo?.title}</span>
                        {isMenuOpen && <div className="postTopEditDel">

{memo.userId === currentUser._id && (memo?.title === `nMemo ${date.toLocaleDateString('nl-Nl')}` || memo?.title === `MemoToLine ${date.toLocaleDateString('nl-Nl')}`) ?
    <div className="editDeleteBtns">
        {/* <div className="notActiveBtn">
            <Edit onClick={() => setIsMenuOpen(!isMenuOpen)} />
        </div> */}
        <div className="deleteBtn" onClick={memoDeleteHandler} >
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
                        {/* <MoreVert />
                        {memo.userId === currentUser._id ? <HighlightOff className="postMemoDelete" onClick={memoDeleteHandler} />
                        :<AddComment />} */}
                    </div>
                </div>
                <div className="postMemoCenter">
                    <span className="postMemoText">{memo?.desc}</span>
                    <img className="postMemoImg" src={PF + memo.img} alt="" />
                </div>
                {/*<div className="postMemoBottom">
                    <div className="postMemoBottomLeft">
                        <ThumbUpOffAlt className="likeIcon" onClick={likeHandler}/>
                        <span className="postMemoLikeCounter">{like} people like it</span>
                        <FavoriteBorder className="likeIcon" onClick={loveHandler}/>
                        <span className="postMemoLikeCounter">{love} people love it</span>
                    </div>
                     <div className="postMemoBottomRight">
                        <span className="postMemoCommentText">{memo.comment} comments</span>
                    </div> 
                </div>*/}
            </div>
        </div>
    )
}
