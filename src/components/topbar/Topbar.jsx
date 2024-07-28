import "./topbar.css";
import AvatarUser from "../avatarUser/AvatarUser";
import AllUsers from "../allUsers/AllUsers";
import UserRole from "../userRole/UserRole";
import {
  Person,
  Logout,
  Settings,
  WorkOutline,
  Refresh,
} from "@mui/icons-material";
import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { ThreeDots, BallTriangle } from "react-loader-spinner";
import i18n from "i18next";

export default function Topbar() {
  const API = process.env.REACT_APP_SERVER_API;
  const date = new Date();
  const { user, dispatch } = useContext(AuthContext);
  // const { user: currentUser, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openWals, setOpenWals] = useState(false);
  const [allUsers, setUsers] = useState([]);
  const [followed, setFollowed] = useState(user.followings.includes(user?._id));
  const [changeLang, setChangeLang] = useState(false);
  const [chooseLang, setChooseLang] = useState("en");
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [logoutWals, setLogoutWals] = useState(false);

  let menuRef = useRef();
  let changeWalsRef = useRef();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setChooseLang(language);
    setChangeLang(!changeLang);
  };

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
      if (!changeWalsRef.current.contains(e.target)) {
        setOpenWals(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  useEffect(() => {
    const getUsers = async () => {
      try {
        setIsDataLoading(true);
        const res = await axios.get(`${API}/users/usersList`);
        setUsers(res.data);
        setIsDataLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, [API]);

  const handleClickChangeWals = async (changeWals) => {
    const cleanFollow = {
      userId: user._id,
      followings: [],
    };
    try {
      await axios.put(`${API}/users/${user._id}`, cleanFollow);
      await axios.put(`${API}/users/${changeWals._id}/follow`, {
        userId: user._id,
      });
      dispatch({ type: "FOLLOW", payload: user._id });
      // window.location.reload();
    } catch (err) {
      console.log(err);
      await axios.put(`${API}/users/${changeWals._id}/unfollow`, {
        userId: user._id,
      });
      dispatch({ type: "UNFOLLOW", payload: user._id });
      await axios.put(`${API}/users/${changeWals._id}/follow`, {
        userId: user._id,
      });
      dispatch({ type: "FOLLOW", payload: user._id });
      // window.location.reload();
    }
    try {
      await axios.put(`${API}/users/${user._id}/follow`, {
        userId: changeWals._id,
      });
      dispatch({ type: "FOLLOW", payload: changeWals._id });
      window.location.reload();
    } catch (err) {
      console.log(err);
      await axios.put(`${API}/users/${user._id}/unfollow`, {
        userId: changeWals._id,
      });
      dispatch({ type: "UNFOLLOW", payload: changeWals._id });
      await axios.put(`${API}/users/${user._id}/follow`, {
        userId: changeWals._id,
      });
      dispatch({ type: "FOLLOW", payload: changeWals._id });
      window.location.reload();
    }
    setFollowed(!followed);
  };

  const logout = () => {
    navigate("/");
    localStorage.clear();
    window.location.reload();
  };

  function DropdownItem(props) {
    return (
      <li className="topbarMenuDropdownItem">
        <span style={{ marginRight: "10px" }}> {props.img} </span>
        <span> {props.text} </span>
      </li>
    );
  }

  const handleLang = () => {
    setChangeLang(!changeLang);
    setChooseLang(!chooseLang);
  };

  // const handleLangSelect = (lang) => {

  // }

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  let hh = addZero(date.getHours());
  let mm = addZero(date.getMinutes());

  //atention changed format of date to fr-CA not nl-NL
  let time = hh + ":" + mm;

  const handleLogoutWals = (e) => {
    console.log(e);
    if (e === time) {
      setLogoutWals(!logoutWals);
    }
  };

  return (
    <div className="topbarContainer">
      <div className="topbarRefresh" onClick={() => window.location.reload()}>
        <Refresh titleAccess="Refresh" />
      </div>
      {isDataLoading ? (
        <div className="loadingCover">
          <div className="loading">
            <BallTriangle
              height={196}
              width={196}
              radius={5}
              color="var(--main)"
              ariaLabel="ball-triangle-loading"
              wrapperStyle={{}}
              wrapperClass="loadingHero"
              visible={true}
            />
            <div className="loadingTextContainer">
              <p className="loadingText">Loading</p>
              <ThreeDots
                visible={true}
                height="10"
                width="30"
                color="var(--main)"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass="loadingTextThreeDots"
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* <div className="container"> */}

          {/* //TODO: Finish the popup to join the line */}
          <div
            className={`changeWalsDropdown ${openWals ? "active" : "inactive"}`}
          >
            <div className="changeWals">
              <div className="changeWalsDropdownInner" ref={changeWalsRef}>
                <ul>
                  {Object.values(allUsers).map((changeWals) => {
                    return (
                      <div
                        onClick={() => handleClickChangeWals(changeWals)}
                        key={changeWals._id}
                      >
                        {changeWals.role === 3 ? (
                          <>
                            <AllUsers user={changeWals} />
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className="topbarLeft">
            <div className="topbarLogo" style={{ color: "white" }}>
              <Link
                className="logoLink"
                to="/"
                style={{ textDecoration: "none" }}
              >
                <div className="logoIcon">
                  <img
                    className="logoIconImg"
                    src="../../../assets/ico/logo.svg"
                    alt="Logo nMemo"
                  />
                </div>
                <span className="logoText">nMemo</span>
              </Link>
            </div>
          </div>
          <div className="topbarCenter">
            {user.username || user.personnelnumber}
            {JSON.parse(localStorage.getItem("product")) && (
              <Link
                to={`/orders/${user.personnelnumber}`}
                style={{ textDecoration: "none" }}
              >
                <div className="topbarCenterProducts">
                  <WorkOutline />
                  <div className="topbarCenterProductsText">
                    {JSON.parse(localStorage.getItem("product"))}
                  </div>
                </div>
              </Link>
            )}
          </div>
          <div className="topbarRight">
            {/* <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person htmlColor="white" />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Link to={`/messenger`} style={{ textDecoration: "none" }}>
                            <Chat htmlColor="white" />
                        </Link>
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications htmlColor="white" />
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div> */}
            <div className="topbarUserItems">
              {chooseLang === "en" && (
                <div
                  className="topbarIconLangItemMain"
                  onClick={() => handleLang()}
                >
                  <img
                    className="topbarIconLang"
                    src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f1ec-1f1e7.png"
                    alt="ENG"
                  />
                </div>
              )}
              {chooseLang === "ua" && (
                <div
                  className="topbarIconLangItemMain"
                  onClick={() => handleLang()}
                >
                  <img
                    className="topbarIconLang"
                    src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f1fa-1f1e6.png"
                    alt="UA"
                  />
                </div>
              )}
              {changeLang && (
                <>
                  <ul className="topbarIconItems">
                    <li
                      className="topbarIconLangItemMain"
                      onClick={() => changeLanguage("en")}
                    >
                      <img
                        className="topbarIconLang"
                        src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f1f3-1f1f1.png"
                        alt="NL"
                      />
                    </li>
                    <li
                      className="topbarIconLangItem"
                      onClick={() => changeLanguage("en")}
                    >
                      <img
                        className="topbarIconLang"
                        src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f1ec-1f1e7.png"
                        alt="ENG"
                      />
                    </li>
                    <li
                      className="topbarIconLangItem"
                      onClick={() => changeLanguage("en")}
                    >
                      <img
                        className="topbarIconLang"
                        src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f1f5-1f1f1.png"
                        alt="PL"
                      />
                    </li>
                    <li
                      className="topbarIconLangItem"
                      onClick={() => changeLanguage("en")}
                    >
                      <img
                        className="topbarIconLang"
                        src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f1f7-1f1f4.png"
                        alt="RO"
                      />
                    </li>
                    <li
                      className="topbarIconLangItem"
                      onClick={() => changeLanguage("ua")}
                    >
                      <img
                        className="topbarIconLang"
                        src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f1fa-1f1e6.png"
                        alt="UKR"
                      />
                    </li>
                  </ul>
                </>
              )}

              <div className="topbarMenuContainer" ref={menuRef}>
                <div
                  className="topbarMenuBtn"
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  <div className="avatarUser">
                    <AvatarUser user={user} />
                  </div>
                </div>

                <div
                  className={`topbarMenuDropdown ${
                    open ? "active" : "inactive"
                  }`}
                >
                  <h3 className="topbarMenuDropdownPersonnelnumber">
                    {user.username || user.personnelnumber}
                    <br />
                    <UserRole user={user} />{" "}
                  </h3>
                  <ul>
                    <Link to={`/license`} style={{ textDecoration: "none" }}>
                      <DropdownItem
                        img={
                          <img
                            className="logoIconImg"
                            src="../../../assets/ico/chat.svg"
                            alt="Logo nMemo"
                          />
                        }
                        text={"nMemo ά 0.2"}
                      />
                    </Link>
                    <Link
                      to={`/profile/${user.personnelnumber}`}
                      style={{ textDecoration: "none" }}
                    >
                      <DropdownItem img={<Person />} text={"My Profile"} />
                    </Link>
                    {user.role !== 3 && (
                      <Link
                        to={`/editProfile/${user.personnelnumber}`}
                        style={{ textDecoration: "none" }}
                      >
                        <DropdownItem
                          img={<Settings />}
                          text={"Edit Profile"}
                        />
                      </Link>
                    )}
                    {/* {user.role === 0 || user?.isAdmin ? (
                      <Link
                        to={`/editEvents/${user.personnelnumber}`}
                        style={{ textDecoration: "none" }}
                      >
                        <DropdownItem img={<Settings />} text={"Edit Events"} />
                      </Link>
                    ) : (
                      <></>
                    )} */}
                    {/* {user.role !== 1 && (
                      <Link
                        to={`/editShiftTransfer/${user.personnelnumber}`}
                        style={{ textDecoration: "none" }}
                      >
                        <DropdownItem
                          img={<Settings />}
                          text={"Shift Transfer"}
                        />
                      </Link>
                    )} */}
                    {/* {user.role === 1 ? <Link onClick={() => { setOpenWals(!openWals) }} style={{ textDecoration: "none" }}>
                                    <DropdownItem img={<Tune />} text={"Join the line"} style={{ textAlign: "center" }} />
                                </Link>
                                    : <></>} */}
                    {user.role === 3 ? (
                      <>
                        {logoutWals === false && (
                          <div className="topbarLogoutContainer">
                            <input
                              className="topbarLogoutInput"
                              type="password"
                              placeholder="Logout:Code"
                              minLength={5}
                              maxLength={6}
                              onChange={(e) => handleLogoutWals(e.target.value)}
                            />
                          </div>
                        )}
                        {logoutWals && (
                          <Link
                            onClick={logout}
                            reloadDocument
                            to="/"
                            style={{ textDecoration: "none" }}
                          >
                            <DropdownItem img={<Logout />} text={"Logout"} />
                          </Link>
                        )}
                      </>
                    ) : (
                      <Link
                        onClick={logout}
                        reloadDocument
                        to="/"
                        style={{ textDecoration: "none" }}
                      >
                        <DropdownItem img={<Logout />} text={"Logout"} />
                      </Link>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </>
      )}
    </div>
  );
}
