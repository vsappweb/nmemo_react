import "./topbar.css";
import AvatarUser from "../avatarUser/AvatarUser";
import AllUsers from "../allUsers/AllUsers";
import UserRole from "../userRole/UserRole"
import { Person, Info, Logout, Settings } from "@mui/icons-material";
import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Topbar() {
    const API = process.env.REACT_APP_SERVER_API;
    const { user, dispatch } = useContext(AuthContext);
    // const { user: currentUser, dispatch } = useContext(AuthContext);
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [openWals, setOpenWals] = useState(false);
    const [allUsers, setUsers] = useState([]);
    const [followed, setFollowed] = useState(user.followings.includes(user?._id));
    const [changeLang, setChangeLang] = useState(false);
    const [chooseLang, setChooseLang] = useState(true);

    let menuRef = useRef();
    let changeWalsRef = useRef();
    const eng = useRef();
    const pl = useRef();
    const nl = useRef();
    const ukr = useRef();


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
        }

    });

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axios.get(`${API}/users/usersList`);
                setUsers(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUsers()
    }, [API]);

    const handleClickChangeWals = async (changeWals) => {
        const cleanFollow = {
            userId: user._id,
            followings: [],
        };
        try {
            await axios.put(`${API}/users/${user._id}`, cleanFollow);
            await axios.put(`${API}/users/${changeWals._id}/follow`, { userId: user._id });
            dispatch({ type: "FOLLOW", payload: user._id })
            // window.location.reload();
        } catch (err) {
            console.log(err)
            await axios.put(`${API}/users/${changeWals._id}/unfollow`, { userId: user._id });
            dispatch({ type: "UNFOLLOW", payload: user._id });
            await axios.put(`${API}/users/${changeWals._id}/follow`, { userId: user._id });
            dispatch({ type: "FOLLOW", payload: user._id })
            // window.location.reload();
        }
        try {
            await axios.put(`${API}/users/${user._id}/follow`, { userId: changeWals._id });
            dispatch({ type: "FOLLOW", payload: changeWals._id })
            window.location.reload();
        } catch (err) {
            console.log(err)
            await axios.put(`${API}/users/${user._id}/unfollow`, { userId: changeWals._id });
            dispatch({ type: "UNFOLLOW", payload: changeWals._id });
            await axios.put(`${API}/users/${user._id}/follow`, { userId: changeWals._id });
            dispatch({ type: "FOLLOW", payload: changeWals._id })
            window.location.reload();
        }
        setFollowed(!followed);
    }


    const logout = () => {
        navigate("/")
        localStorage.clear();
        window.location.reload();
    }


    function DropdownItem(props) {
        return (
            <li className='topbarMenuDropdownItem'>
                <span style={{ marginRight: "10px" }}> {props.img} </span>
                <span> {props.text} </span>
            </li>
        );
    }

    const handleLang = (e) => {
        setChangeLang(!changeLang);
        setChooseLang(!chooseLang);
    }

    return (

        <div className='topbarContainer'>
            {/* <div className="container"> */}


            {/* //TODO: Finish the popup to join the line */}
            <div className={`changeWalsDropdown ${openWals ? 'active' : 'inactive'}`}  >
                <div className="changeWals">
                    <div className="changeWalsDropdownInner" ref={changeWalsRef}>
                        <ul>
                            {Object.values(allUsers).map((changeWals) => {

                                return (
                                    <div onClick={() => handleClickChangeWals(changeWals)} key={changeWals._id} >

                                        {changeWals.role === 3 ?
                                            <>
                                                <AllUsers user={changeWals} />
                                            </>
                                            :
                                            <>
                                            </>}
                                    </div>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="topbarLeft">
                <div className="topbarLogo" style={{ color: "white" }}>
                    <Link className="logoLink" to="/" style={{ textDecoration: "none" }}>
                        <div className="logoIcon">
                     
                            <img className="logoIconImg" src="../../../assets/ico/logo.svg" alt="Logo nMemo" />
                        </div>
                        <span className="logoText">nMemo</span>
                    </Link>
                </div>
            </div>
            <div className="topbarCenter">
                {user.username || user.personnelnumber}


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
                    {chooseLang && <div className="topbarIconLangItemMain" onClick={(e) => handleLang(e)}>
                        <img className="topbarIconLang" src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f1ec-1f1e7.png
" alt="ENG" />
                    </div>}
                    {changeLang && <div className="topbarIconItems">
                        <div className="topbarIconLangItemMain" ref={nl} onClick={(e) => handleLang(e)}>
                            <img className="topbarIconLang" src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f1f3-1f1f1.png
" alt="NL" /></div>
                        <div className="topbarIconLangItem" ref={eng} onClick={(e) => handleLang(e)}>
                            <img className="topbarIconLang" src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f1ec-1f1e7.png
" alt="ENG" />
                        </div>
                        <div className="topbarIconLangItem" ref={pl} onClick={(e) => handleLang(e)}>
                            <img className="topbarIconLang" src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f1f5-1f1f1.png
" alt="PL" />
                        </div>
                        <div className="topbarIconLangItem" ref={pl} onClick={(e) => handleLang(e)}>
                            <img className="topbarIconLang" src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f1f7-1f1f4.png
" alt="RO" />
                        </div>
                        <div className="topbarIconLangItem" ref={ukr} onClick={(e) => handleLang(e)}>
                            <img className="topbarIconLang" src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f1fa-1f1e6.png
" alt="UKR" />
                        </div>
                    </div>}


                    <div className='topbarMenuContainer' ref={menuRef}>
                        <div className='topbarMenuBtn' onClick={() => { setOpen(!open) }}>
                            <div className="avatarUser">
                                <AvatarUser user={user} />
                            </div>
                        </div>

                        <div className={`topbarMenuDropdown ${open ? 'active' : 'inactive'}`} >
                            <h3 className="topbarMenuDropdownPersonnelnumber">{user.username || user.personnelnumber}<br />
                                <UserRole user={user} /></h3>
                            <ul>
                                <Link to={`/license`} style={{ textDecoration: "none" }}>
                                    <DropdownItem img={<img className="logoIconImg" src="../../../assets/ico/chat.svg" alt="Logo nMemo" />} text={"nMemo ά 0.2"} />
                                </Link>
                                <Link to={`/profile/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                                    <DropdownItem img={<Person />} text={"My Profile"} />
                                </Link>
                                <Link to={`/editProfile/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                                    <DropdownItem img={<Settings />} text={"Edit Profile"} />
                                </Link>
                                {user.role === 0 || user?.isAdmin ? <Link to={`/editEvents/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                                    <DropdownItem img={<Settings />} text={"Edit Events"} />
                                </Link> : <></>}
                                {user.role !== 1 && <Link to={`/editShiftTransfer/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                                    <DropdownItem img={<Settings />} text={"Shift Transfer"} />
                                </Link>}
                                {/* {user.role === 1 ? <Link onClick={() => { setOpenWals(!openWals) }} style={{ textDecoration: "none" }}>
                                    <DropdownItem img={<Tune />} text={"Join the line"} style={{ textAlign: "center" }} />
                                </Link>
                                    : <></>} */}
                                <Link onClick={logout} reloadDocument to="/" style={{ textDecoration: "none" }}>
                                    <DropdownItem img={<Logout />} text={"Logout"} />
                                </Link>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
            {/* </div> */}
        </div>
    );
}

