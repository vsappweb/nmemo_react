import React, { useState, useEffect, useContext } from 'react'
import './nMemo.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Rightbar from '../../components/rightbar/Rightbar'
import Memo from '../../components/memo/Memo'
import PostMemo from "../../components/postMemo/PostMemo";
import axios from "axios"
import { AuthContext } from "../../context/AuthContext";
import RightbarMonitoring from '../../components/rightbarMonitoring/RightbarMonitoring'


export default function NMemo() {
  const API = process.env.REACT_APP_SERVER_API;
  const [postsMemo, setPostsMemo] = useState([]);
  const { user } = useContext(AuthContext)
  let [allMemos, setAllMemos] = useState([]);
  const [hideMemos, setHideMemos] = useState(false);


  useEffect(() => {
    let interval;
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API}/memos/allMemos`);
        setAllMemos(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    let result = fetchData()

    if (!result) {
      interval = setInterval(fetchData, 10000);
    }

    interval = setInterval(fetchData, 10000); //set your time here. repeat every 10 seconds

    return () => clearInterval(interval);
  }, [API]);

  // // sort users by role (operators and wals)
  // const sort = (a, b) => {
  //   return (b.userId) - (a.userId);
  // }

  // allMemos = Object.values(allMemos).sort(sort);

  // // filter users by role (operators and wals)
  // allUsers = Object.values(allUsers).filter((user) => {
  //   return user.role === 1 || user.role === 3;
  // });


  const handleHideMemosForm = () => {
    setHideMemos(!hideMemos);
  }

  useEffect(() => {
    const fetchPostsMemo = async () => {
      const res = await axios.get(`${API}/memos/profile/` + user.personnelnumber)
      setPostsMemo(res.data.sort((m1, m2) => {
        return new Date(m2.createdAt) - new Date(m1.createdAt);
      }));
    };
    fetchPostsMemo();
  }, [user.personnelnumber, API]);


  const compare = (a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  }

  allMemos = Object.values(allMemos).sort(compare);

  allMemos = Object.values(allMemos).filter(memo => memo.title === `nMemo ${new Date().toLocaleDateString('nl-NL')}`);

  return (
    <>
      <Topbar />
      <div className='nMemo'>
        <Sidebar />
        <div className="nMemoCenter">
          {(user && user.role === 0) || (user && user.isAdmin) ? (
            <div className="nMemoContainer">
              <button
                className="nMemoContainerShowHideBtn"
                onClick={handleHideMemosForm}
              >
                {hideMemos ? "Hide Edit Memo Text" : "Show Edit Memo Text"}
              </button>
            </div>
          ) : null}

          {/* {user.role === 0 || user.isAdmin ? <>
            {hideShiftTransferSorting && <div className="editShiftTransferRightSorting editShiftTransferListWrapper">
              <h2 className="editShiftTransferRightSortingTitle">sort transfer shift</h2>
              <input className="editShiftTransferRightSortingInput" type="date" placeholder="Date" />
              <select className="editShiftTransferRightSortingInput" defaultValue="3" >
                <option className="editShiftTransferRightSortingInput" value="1">Operator</option>
                <option className="editShiftTransferRightSortingInput" value="2">Shift</option>
                <option className="editShiftTransferRightSortingInput" value="3">Wals</option>
                <option className="editShiftTransferRightSortingInput" value="4">Week</option>
              </select>
              <input className="editShiftTransferRightSortingInput" type="text" />
              <button className="editProfileButtonGet" onClick={() => window.location.reload()} >sort</button>
            </div>}
          </> : <></>} */}

          {hideMemos && (
            <div className="nMemoCenterWrapper">
              <Memo />
            </div>
          )}

          {user.role === 3 && (
            <div className="nMemoCenterWrapper">
              <Memo />
            </div>
          )}
          <div className="nMemoMessageContainer">
            {(user.role === 2 || user.role === 0) &&
              (Object.values(allMemos).map((m) => (
                <li className="nMemoViev" key={m._id}>
                  <PostMemo memo={m} />
                </li>
              )))}

            {user.role === 3 &&
              <ul>
                {postsMemo.map((m) => (
                  <li key={m._id} style={{ marginBottom: "15px" }}>
                    <PostMemo memo={m} />
                  </li>
                ))}
              </ul>

            }
          </div>
        </div>
        {(user.role === 2 || user.role === 0) ? <RightbarMonitoring /> : <Rightbar />}
      </div>
    </>
  )
}
