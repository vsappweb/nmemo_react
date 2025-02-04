import "./rightbarMonitoring.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
// import { AuthContext } from "../../context/AuthContext";
import AllUsers from "../allUsers/AllUsers";
import { renderToString } from "react-dom/server";
import DateTimeShift from "../../components/dateTimeShift/DateTimeShift";
import { MenuOpen } from "@mui/icons-material";

export default function RightbarMonitoring() {
  const API = process.env.REACT_APP_SERVER_API;
  let [allUsers, setAllUsers] = useState([]);
  let [showConfirmationMemo, setShowConfirmationMemo] = useState(false);
  let [showConfirmationShift, setShowConfirmationShift] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRightbarMonitoring = useRef();

  const shiftNow = renderToString(<DateTimeShift />);

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

  useEffect(() => {
    let interval;
    const getConfirmationMemo = async () => {
      try {
        const res = await axios.get(`${API}/memos/allMemos`);
        setShowConfirmationMemo(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    let result = getConfirmationMemo();

    if (!result) {
      interval = setInterval(getConfirmationMemo, 60000);
    }
    interval = setInterval(getConfirmationMemo, 60000);
    return () => clearInterval(interval);
  }, [API]);

  useEffect(() => {
    let interval;
    const getConfirmationShift = async () => {
      try {
        const res = await axios.get(`${API}/shiftTransfers/allShiftTransfers`);
        setShowConfirmationShift(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    let result = getConfirmationShift();

    if (!result) {
      interval = setInterval(getConfirmationShift, 60000);
    }
    interval = setInterval(getConfirmationShift, 60000);
    return () => clearInterval(interval);
  }, [API]);

  // sort events by date and time
  const compare = (a, b) => {
    return new Date(a.role) - new Date(b.role);
  };
  allUsers = Object.values(allUsers).sort(compare);
  allUsers = Object.values(allUsers).filter((user) => user.role === 3);

  // TODO: filter for today problem night shifts when changed date
  showConfirmationShift = Object.values(showConfirmationShift).filter(
    (shift) =>
      shift.date === new Date().toLocaleDateString("nl-NL") &&
      shift.shift === shiftNow
  );

  showConfirmationMemo = Object.values(showConfirmationMemo).filter(
    (memo) => memo.title === `nMemo ${new Date().toLocaleDateString("nl-NL")}`
  );

  const MemoRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">Indicator shift</h4>
        <div className="rightbarMonitoringBox">
          <button
            className="rightbarMonitoringButton"
            onClick={() => window.location.reload()}
          >
            Check
          </button>
        </div>
        <ul>
          {Object.values(allUsers).map((u) => (
            <li
              className="allUsersWrapperRightbarMonitoring"
              key={u._id}
              style={{ marginBottom: "15px" }}
            >
              <AllUsers user={u} />
              {Object.values(showConfirmationShift).map(
                (sc) =>
                  sc.userId === u._id &&
                  sc.createdAt < { $gt: new Date(Date.now()) } && (
                    <>
                      <p
                        className="rightbarMonitoringConfirmation"
                        key={sc._id}
                      >
                        Done
                      </p>
                    </>
                  )
              )}
            </li>
          ))}
        </ul>
      </>
    );
  };
  const ShiftTransferRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">Indicator nMemo</h4>
        <div className="rightbarMonitoringBox">
          <button
            className="rightbarMonitoringButton"
            onClick={() => window.location.reload()}
          >
            Check
          </button>
        </div>
        <ul>
          {Object.values(allUsers).map((uSt) => (
            <li
              className="allUsersWrapperRightbarMonitoring"
              style={{ marginBottom: "15px" }}
              key={uSt._id}
            >
              <AllUsers user={uSt} />
              {Object.values(showConfirmationMemo).map(
                (scSt) =>
                  scSt.userId === uSt._id &&
                  scSt.createdAt < { $gt: new Date(Date.now()) } && (
                    <>
                      <p
                        className="rightbarMonitoringConfirmation"
                        key={scSt._id}
                      >
                        Done
                      </p>
                    </>
                  )
              )}
            </li>
          ))}
        </ul>
      </>
    );
  };

  // const showRightbarMonitoring = () => {
  //   document.querySelector(".rightbarMonitoring").classList.toggle("active");
  //   document
  //     .querySelector(".rightbarMonitoringBurger")
  //     .classList.toggle("active");
  //   document
  //     .querySelector(".rightbarMonitoringBurgerLineOne")
  //     .classList.toggle("active");
  //   document
  //     .querySelector(".rightbarMonitoringBurgerLineTwo")
  //     .classList.toggle("active");
  //   document
  //     .querySelector(".rightbarMonitoringBurgerLineThree")
  //     .classList.toggle("active");
  // };
  useEffect(() => {
    let handler = (e) => {
      if (!menuRightbarMonitoring.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  })

  return (
    <>
      <div
        className={`rightbarMonitoringBurger ${open ? "active" : ""}`}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div className={`rightbarMonitoringBurgerLineOne ${open ? "active" : ""}`}></div>
        <div className={`rightbarMonitoringBurgerLineTwo ${open ? "active" : ""}`}></div>
        <div className={`rightbarMonitoringBurgerLineThree ${open ? "active" : ""}`}></div>
      </div>
      <div className={`rightbarMonitoring ${open ? "active" : ""}`} ref={menuRightbarMonitoring}>
        <div className="rightbarMonitoringWrapper">
          <MemoRightbar />
          <ShiftTransferRightbar />
        </div>
      </div>
    </>
  );
}
