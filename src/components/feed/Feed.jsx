import { useContext, useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import Post from "../post/Post";
import PostMemo from "../postMemo/PostMemo";
// import PostShiftTransfer from "../postShiftTransfer/PostShiftTransfer";
import Share from "../share/Share";
// import Memo from "../memo/Memo";
// import ShiftTransfer from "../shiftTransfer/ShiftTransfer";
// import MemoToLine from "../memoToLine/MemoToLine";
import PostTlToLine2 from "../postTlToLine2/PostTlToLine2";
import ShiftTransfer2 from "../shiftTransfer2/ShiftTransfer2";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import DateTimeShift from "../dateTimeShift/DateTimeShift";
import { ExpandCircleDownOutlined } from "@mui/icons-material";
// import Picker from "emoji-picker-react";
import { format } from "timeago.js";

export default function Feed({ personnelnumber, shiftTransfer }) {
  const API = process.env.REACT_APP_SERVER_API;
  let date = new Date();
  const [posts, setPosts] = useState([]);
  const [postsMemo, setPostsMemo] = useState([]);
  let [postsShiftTransfer, setPostsShiftTransfer] = useState([]);
  const { user } = useContext(AuthContext);
  let [allTlToLines, setTlToLines] = useState([]);
  let [allMemoToLines, setMemoToLines] = useState([]);
  const [hideShiftTransferForm, setHideShiftTransferForm] = useState(true);
  const [openAnswer, setOpenAnswer] = useState(false);
  const [expandMore, setExpandMore] = useState(5);

  // get all events from database
  const shiftNow = renderToString(<DateTimeShift />);

  useEffect(() => {
    let interval;
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API}/tlToLines/allTlToLines`);
        setTlToLines(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    let result = fetchData();

    if (!result) {
      interval = setInterval(fetchData, 10000);
    }

    interval = setInterval(fetchData, 10000); //set your time here. repeat every 5 seconds
    return () => clearInterval(interval);
  }, [API]);

  // get all tlToLines from database
  useEffect(() => {
    let interval;
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API}/memos/allMemos`);
        setMemoToLines(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    let result = fetchData();

    if (!result) {
      interval = setInterval(fetchData, 10000);
    }

    interval = setInterval(fetchData, 10000); //set your time here. repeat every 5 seconds
    return () => clearInterval(interval);
  }, [API]);

  useEffect(() => {
    const fetchPostsShiftTransfer = async () => {
      const res = await axios.get(
        `${API}/shiftTransfers/profile/` + user.personnelnumber
      );
      setPostsShiftTransfer(
        res.data.sort((st1, st2) => {
          return new Date(st2.createdAt) - new Date(st1.createdAt);
        })
      );
    };
    fetchPostsShiftTransfer();
  }, [user.personnelnumber, API]);

  useEffect(() => {
    const fetchPostsMemo = async () => {
      const res = personnelnumber
        ? await axios.get(`${API}/memos/profile/` + personnelnumber)
        : await axios.get(`${API}/memos/timeline/` + user._id);
      setPostsMemo(
        res.data.sort((m1, m2) => {
          return new Date(m2.createdAt) - new Date(m1.createdAt);
        })
      );
    };
    fetchPostsMemo();
  }, [personnelnumber, user._id, API]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = personnelnumber
        ? await axios.get(`${API}/posts/profile/` + personnelnumber)
        : await axios.get(`${API}/posts/timeline/` + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [personnelnumber, user._id, API]);

  // sort users by line
  const shiftNowIs = (a, b) => {
    return a.createdAt - b.createdAt;
  };

  postsShiftTransfer = Object.values(postsShiftTransfer).sort(shiftNowIs);

  // filter for current user
  postsShiftTransfer = Object.values(postsShiftTransfer)
    .slice(0, 1)
    .filter((shtni) => {
      return shtni.line === user.username;
    });

  useEffect(() => {
    let interval;
    const whatShift = async () => {
      try {
        if (postsShiftTransfer) {
          Object.values(postsShiftTransfer).forEach((postsShiftTransfer) => {
            if (
              (postsShiftTransfer.shift === shiftNow &&
                postsShiftTransfer.date === date.toLocaleDateString("nl-NL")) ||
              shiftNow === "outside"
            ) {
              setHideShiftTransferForm(false);
            } else if (
              postsShiftTransfer.shift !== shiftNow &&
              postsShiftTransfer.date === date.toLocaleDateString("nl-NL")
            ) {
              // console.log("show shift transfer form",postsShiftTransfer.shift, shiftNow, postsShiftTransfer.date, date.toLocaleDateString('nl-NL'));
              setHideShiftTransferForm(true);
            }
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    let result = whatShift();
    if (!result) {
      interval = setInterval(whatShift, 10000);
    }
    interval = setInterval(whatShift, 10000);
    return () => clearInterval(interval);
  }, [postsShiftTransfer, shiftNow, date]);

  // sort users by line
  const lines = (a, b) => {
    return b.line - a.line;
  };

  allMemoToLines = Object.values(allMemoToLines).sort(lines);

  // filter for current user
  allMemoToLines = Object.values(allMemoToLines).filter((mTl) => {
    return mTl.line === user.personnelnumber;
  });

  return (
    <div className="feed">
      <div className="feedWrapper">
        <ul className="feedTlToLineList">
          {Object.values(allTlToLines).map((toLines) => {
            return (
              <li className="feedTlToLineInformation" key={toLines._id}>
                <PostTlToLine2
                  toLines={toLines}
                  allTlToLines={allTlToLines}
                  setTlToLines={setTlToLines}
                  openAnswer={openAnswer}
                  setOpenAnswer={setOpenAnswer}
                />
              </li>
            );
          })}
        </ul>

        {user.role === 3 && <>{hideShiftTransferForm && <ShiftTransfer2 />}</>}

        {/* {(!personnelnumber || personnelnumber === user.personnelnumber) && (
          <Share />
        )} test */}

        <ul className="feedTlToLineList">
          {Object.values(allMemoToLines).map((mTl) => (
            <li className="feedTlToLineInformation" key={mTl._id}>
              {mTl?.line === user.personnelnumber &&
              mTl?.createdAt.split("T")[0].split("-")[0] ===
                date.toISOString().split("T")[0].split("-")[0] &&
              mTl?.createdAt.split("T")[0].split("-")[1] ===
                date.toISOString().split("T")[0].split("-")[1] &&
              new Date(mTl.createdAt).getDate() + 1 >= date.getDate() ? (
                <>
                  <PostMemo memo={mTl} />
                  <p style={{ fontSize: "10px", writingMode: "vertical-rl" }}>
                    Wals {mTl?.line}
                  </p>
                </>
              ) : (
                <></>
              )}
            </li>
          ))}
        </ul>

        {postsMemo.slice(0, 1).map((m) => (
          <>
            {/* {
              m?.userId === user.personnelnumber &&
              m?.createdAt.split("T")[0].split("-")[0] ===
              date.toISOString().split("T")[0].split("-")[0] &&
              m?.createdAt.split("T")[0].split("-")[1] ===
              date.toISOString().split("T")[0].split("-")[1] &&
              new Date(m.createdAt).getDate() + 1 >= date.getDate() ? (
            <> */}
            <PostMemo key={m._id} memo={m} />
            {/* </>
            ) : (
              <>
                <div className="postMemo">
                <div className="postMemoWrapper">
                  <p className="postMemoText" style={{ textAlign: "center" }}>
                  Сheck the Memo in "Leave an IATF Memo".<br/><br/>  
                  The last Memo was made nearly {format(m.createdAt)}</p>
                </div>
                </div>
              </>
            )} */}
          </>
        ))}
        {/* {posts.slice(0, expandMore).map((p) => (
          <Post key={p._id} post={p} />
        ))} test */}
        {posts.length === expandMore || posts.length < expandMore ? (
          <> </>
        ) : (
          <div className="expandBtn">
            <div
              className="editBtn"
              onClick={() => setExpandMore(expandMore + 5)}
            >
              <ExpandCircleDownOutlined />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
