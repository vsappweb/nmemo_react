import "./post.css";
import AvatarUser from "../avatarUser/AvatarUser";
import { DoNotTouch, HighlightOff, FavoriteBorder, ThumbUpOffAlt, MoreVert, Edit } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
    const API = process.env.REACT_APP_SERVER_API
    const [like, setLike] = useState(post.likes.length);
    const [love, setLove] = useState(post.loves.length);
    const [isLiked, setIsLiked] = useState(false);
    const [isLoved, setIsLoved] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes]);

    useEffect(() => {
        setIsLoved(post.loves.includes(currentUser._id));
    }, [currentUser._id, post.loves]);


    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`${API}/users?userId=${post.userId}`)
            setUser(res.data)
        };
        fetchUser();
    }, [post.userId, API]);

    const postDeleteHandler = () => {
        try {
            axios.delete(`${API}/posts/` + post._id)
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    }


    const likeHandler = () => {
        try {
            axios.put(`${API}/posts/` + post._id + "/like", { userId: currentUser._id })
        } catch (err) {
        }
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
    }

    const loveHandler = () => {
        try {
            axios.put(`${API}/posts/` + post._id + "/love", { userId: currentUser._id })
        } catch (err) {
        }
        setLove(isLoved ? love - 1 : love + 1)
        setIsLoved(!isLoved)
    }


    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.personnelnumber}`}>
                            <div className="avatarUser">
                                <AvatarUser user={user} />
                            </div>
                        </Link>
                        <span className="postPersonnelnumber">{user.username || user.personnelnumber}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <span className="postTitle">{post?.title}</span>
                        {isMenuOpen && <div className="postTopEditDel">

                            {post.userId === currentUser._id ?
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
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src={PF + post.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <ThumbUpOffAlt className="likeIcon" onClick={likeHandler} />
                        <span className="postLikeCounter">{like} people like it</span>
                        {/* <FavoriteBorder className="likeIcon" onClick={loveHandler} />
                        <span className="postLikeCounter">{love} people love it</span> */}
                    </div>
                    {/* <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
