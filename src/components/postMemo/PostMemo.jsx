import "./postMemo.css";
import AvatarUser from "../avatarUser/AvatarUser";
import { HighlightOff, DoNotTouch, MoreVert, Edit } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function PostMemo({ memo }) {
  const API = process.env.REACT_APP_SERVER_API;
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const date = new Date();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${API}/users?userId=${memo.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [memo.userId, API]);

  const memoDeleteHandler = () => {
    try {
      axios.delete(`${API}/memos/` + memo._id);
      window.alert("Deleted");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

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
            <span className="postMemoPersonnelnumber">
              {user.username || user.personnelnumber}
            </span>
            <span className="postMemoDate">{format(memo.createdAt)}</span>
          </div>
          <div className="postMemoTopRight">
            <span className="postMemoTitle">{memo?.title}</span>
            {isMenuOpen && (
              <div className="postTopEditDel">
                {memo.userId === currentUser._id &&
                (memo?.title === `nMemo ${date.toLocaleDateString("nl-Nl")}` ||
                  memo?.title ===
                    `MemoToLine ${date.toLocaleDateString("nl-Nl")}`) ? (
                  <div className="editDeleteBtns">
                    {/* <div className="editBtn">
                                        <Edit />
                                    </div> */}
                    <div className="deleteBtn" onClick={memoDeleteHandler}>
                      <HighlightOff />
                    </div>
                  </div>
                ) : (
                  <div className="deleteBtn">
                    <DoNotTouch onClick={() => setIsMenuOpen(!isMenuOpen)} />
                  </div>
                )}
              </div>
            )}
            <MoreVert
              className="postMenu"
              style={{ cursor: "pointer" }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
        </div>
        <div className="postMemoCenter">
          <span className="postMemoText">{memo?.desc}</span>
          <img className="postMemoImg" src={PF + memo.img} alt="" />
        </div>
      </div>
    </div>
  );
}
