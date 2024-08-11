import React, { useState, useEffect, useContext } from "react";
import "./nMemo.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import Memo from "../../components/memo/Memo";
import MemoToLine from "../../components/memoToLine/MemoToLine";
import PostMemo from "../../components/postMemo/PostMemo";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import RightbarMonitoring from "../../components/rightbarMonitoring/RightbarMonitoring";
import { ExpandCircleDownOutlined } from "@mui/icons-material";
import AllUsers from "../../components/allUsers/AllUsers";

export default function NMemo() {
  const API = process.env.REACT_APP_SERVER_API;
  const [postsMemo, setPostsMemo] = useState([]);
  const { user } = useContext(AuthContext);
  let [allUsers, setAllUsers] = useState([]);
  let [allMemos, setAllMemos] = useState([]);
  let [allMemosSort, setAllMemosSort] = useState([]);
  const [hideMemos, setHideMemos] = useState(false);
  const [hideAllnMemos, setHideAllnMemos] = useState(false);
  const [expandMore, setExpandMore] = useState(7);

  useEffect(() => {
    let interval;
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API}/memos/allMemos`);
        setAllMemos(res.data);
        setAllMemosSort(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    let result = fetchData();

    if (!result) {
      interval = setInterval(fetchData, 10000);
    }

    interval = setInterval(fetchData, 10000); //set your time here. repeat every 10 seconds

    return () => clearInterval(interval);
  }, [API]);

  useEffect(() => {
    const getUsrsers = async () => {
      try {
        const res = await axios.get(`${API}/users/usersList`);
        setAllUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsrsers();
  }, [API]);

  const handleHideMemosForm = () => {
    setHideMemos(!hideMemos);
    setHideAllnMemos(false);
  };

  const handleHideAllnMemosForm = () => {
    setHideAllnMemos(!hideAllnMemos);
    setHideMemos(false);
  };

  useEffect(() => {
    const fetchPostsMemo = async () => {
      const res = await axios.get(
        `${API}/memos/profile/` + user.personnelnumber
      );
      setPostsMemo(
        res.data.sort((m1, m2) => {
          return new Date(m2.createdAt) - new Date(m1.createdAt);
        })
      );
    };
    fetchPostsMemo();
  }, [user.personnelnumber, API]);

  const compare = (a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  };

  allMemos = Object.values(allMemos).sort(compare);

  allMemos = Object.values(allMemos).filter(
    (memo) => memo.title === `nMemo ${new Date().toLocaleDateString("nl-NL")}`
  );

  const edit = allMemos;

  const compareMemoDate = (a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  };

  allMemosSort = Object.values(allMemosSort).sort(compareMemoDate);
  
  const compareUserRole = (a, b) => {
    return new Date(a.role) - new Date(b.role);
  };
  allUsers = Object.values(allUsers).sort(compareUserRole);
  allUsers = Object.values(allUsers).filter((user) => user.role === 3);

  return (
    <>
      <Topbar />
      <div className="nMemo">
        <Sidebar />
        <div className="nMemoCenter">
          {(user && user.role === 0) || (user && user.isAdmin) ? (
            <div className="nMemoContainer">
              <button
                className="nMemoContainerShowHideBtn"
                onClick={handleHideAllnMemosForm}
              >
                {hideAllnMemos ? "Hide all nMemos" : "Show all nMemos"}
              </button>
              <button
                className="nMemoContainerShowHideBtn"
                onClick={handleHideMemosForm}
              >
                {hideMemos ? "Hide Edit Memo Text" : "Show Edit Memo Text"}
              </button>
            </div>
          ) : null}

          {user.role === 1 && <MemoToLine />}

          {hideMemos && (
            <div className="nMemoCenterWrapper">
              <Memo edit={edit} />
            </div>
          )}

          {hideAllnMemos && (
            <div className="nMemoCenterWrapper">
              <ul>
                {Object.values(allUsers).map((uSt) => (
                  <li
                    className=""
                    style={{ marginBottom: "15px" }}
                    key={uSt._id}
                  >
                    <AllUsers user={uSt} />
                    <br />
                    <div className="nMemoMessageContainer">
                    {Object.values(allMemosSort).map(
                      (memoSort) =>
                        memoSort.userId === uSt._id && (
                          <>
                            <div
                              className="nMemoViev"
                              key={memoSort._id}
                              >
                              <PostMemo memo={memoSort} />
                            </div>
                          </>
                        )
                      )}
                      </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {user.role === 3 && (
            <div className="nMemoCenterWrapper">
              <Memo edit={edit} />
            </div>
          )}
          {hideAllnMemos === false && (
            <div className="nMemoMessageContainer">
              {(user.role === 2 || user.role === 0) &&
                Object.values(allMemos).map((m) => (
                  <li className="nMemoViev" key={m._id}>
                    <PostMemo memo={m} />
                  </li>
                ))}

              {(user.role === 3 || user.role === 1) && (
                <ul className="nMemoPostsList">
                  {postsMemo.slice(0, expandMore).map((m) => (
                    <li key={m._id} style={{ marginBottom: "15px" }}>
                      <PostMemo memo={m} />
                      {user.role === 1 && (
                        <p style={{ fontSize: "10px" }}>Wals {m?.line}</p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              {postsMemo.length === expandMore ||
              postsMemo.length < expandMore ? (
                <> </>
              ) : (
                <div
                  className="editBtn"
                  onClick={() => setExpandMore(expandMore + 7)}
                >
                  <ExpandCircleDownOutlined />
                </div>
              )}
            </div>
          )}
        </div>
        {user.role === 2 || user.role === 0 ? (
          <RightbarMonitoring />
        ) : (
          <Rightbar />
        )}
      </div>
    </>
  );
}
