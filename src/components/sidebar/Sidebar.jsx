import "./sidebar.css";
import { Chat, RateReview, Rule, Settings, WorkOutline, Event, Newspaper, HealthAndSafety, ForwardToInbox, Construction } from "@mui/icons-material";
import AllUsers from "../allUsers/AllUsers";
import { Link } from "react-router-dom";

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

import SidebarSettings from "../sidebarSettings/SidebarSettings";

import { useTranslation } from "react-i18next";

export default function Sidebar() {
    const API = process.env.REACT_APP_SERVER_API
    const NEWS_BRIEF = process.env.REACT_APP_NEWS_BRIEF
    const [allUsers, setUsers] = useState([]);
    const { user } = useContext(AuthContext);

    const { t } = useTranslation();

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

    function SidebarListItem(props) {
        return (
            <li className='sidebarListItem'>
                <span className="sidebarIcon"> {props.img} </span>
                <span className="sidebarListItemText"> {props.text} </span>
            </li>
        );
    }

    const showSidebar = () => {
        document.querySelector(".sidebar").classList.toggle("active");
        document.querySelector(".sidebarBurger").classList.toggle("active");
        document.querySelector(".sidebarBurgerLineOne").classList.toggle("active");
        document.querySelector(".sidebarBurgerLineTwo").classList.toggle("active");
        document.querySelector(".sidebarBurgerLineThree").classList.toggle("active");
    }


    return (
        <>
            <div className="sidebarBurger" onClick={() => { showSidebar() }} >
                <div className="sidebarBurgerLineOne"></div>
                <div className="sidebarBurgerLineTwo"></div>
                <div className="sidebarBurgerLineThree"></div>
            </div>
            <div className="sidebar">
                <div className="sidebarWrapper">
                    <ul className="sidebarList">
                        <Link to={`/events/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                            <SidebarListItem img={<Event />} text={t("sidebar.Agenda")} />
                        </Link>
                        {/* <SidebarListItem img={<School />} text={"Courses"} />
                    <SidebarListItem img={<HelpOutline />} text={"Questions"} /> */}
                        <Link to={NEWS_BRIEF} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }} >
                            <SidebarListItem img={<Newspaper />} text={t("sidebar.news_brief")} />
                        </Link>
                        {/* <Link to={`/newsBrief/${user.personnelnumber}`} onClick={() => { window.open({NEWS_BRIEF}, '_blank', 'width=500,height=500,resizable=yes'); }} style={{ textDecoration: "none" }}>
                            <SidebarListItem img={<Newspaper />} text={t("sidebar.news_brief")} />
                        </Link> */}
                        <hr className="sidebarHr" />
                        <Link to={`/safety`} style={{ textDecoration: "none" }}>
                            <SidebarListItem img={<HealthAndSafety />} text={t("sidebar.Safety")} />
                        </Link>
                        <Link to={`/orders/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                            <SidebarListItem img={<WorkOutline />} text={t("sidebar.Orders/Products")} />
                        </Link>
                        <Link to={`/bmGm/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                            <SidebarListItem img={<Construction />} text={t("sidebar.BM_GM")} />
                        </Link>
                        <Link to={`https://orig.in.net`} style={{ textDecoration: "none" }}>
                            <SidebarListItem img={<img className="logoIconImg" src="../../../assets/ico/nfactor.png" alt="Logo nFactor" style={{width:"30px"}} />} text={"nFactor"} />
                        </Link>
                        <hr className="sidebarHr" />
                        {(user.role === 3 || user.role === 1) && <Link to={`/nMemo/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                            <SidebarListItem img={<RateReview />} text={t("sidebar.Leave_memo_IATF")} />
                        </Link>}
                        {user.role === 2 && <Link to={`/sendTlToLine/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                            <SidebarListItem img={<ForwardToInbox />} text={t("sidebar.Send_info_to_Line")} />
                        </Link>}
                        {user.role === 3 && <Link to={`/editShiftTransfer/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                            <SidebarListItem img={<Rule />} text={t("sidebar.Check_Shift_Transfer")} imgSetting={<Settings />} />
                        </Link>}
                        <hr className="sidebarHr" />
                        <Link to={`/messenger`} style={{ textDecoration: "none" }}>
                            <SidebarListItem img={<Chat />} text={t("sidebar.Chats")} />
                        </Link>
                        {/* <Link to={`/groups/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                        <SidebarListItem img={<Group />} text={t("sidebar.Groups")} />
                    </Link> */}
                        {user.role === 0 || user.isAdmin === true ?
                            <>
                                <h5 className="sidebarSettingsTitle">{t("sidebar.Settings")}</h5>
                                <hr className="sidebarHr" />
                                <SidebarSettings user={user} />
                            </>
                            : <></>}
                    </ul>
                    <hr className="sidebarHr" />
                    {user.role === 0 ?
                        <ul className="sidebarFriendList">
                            {Object.values(allUsers).map((user) => {
                                return (
                                    <li className="allUsersWrapper" style={{ marginBottom: "15px" }} key={user._id}>
                                        <Link to={"/profile/" + user.personnelnumber} style={{ textDecoration: "none" }}  >
                                            {/* {user.role === 404 ?
                                    <> */}
                                            <span className="sidebarUserId">{user._id}</span>
                                            <br />
                                            <div className="sidebarUserPn">
                                                <span className="sidebarUserId" >P/N: {user.personnelnumber}</span>
                                            </div>

                                            <AllUsers user={user} />

                                            {/* </>
                                    :
                                    <>
                                </>} */}
                                        </Link>
                                    </li>

                                )
                            })}
                        </ul>
                        :
                        // <ul className="sidebarFriendList">
                        //     {Object.values(allUsers).map((user) => {
                        //         return (

                        //                 <div className="allUsersWrapper" style={{ marginBottom: "15px" }} key={user._id}>
                        //                     <Link to={"/profile/" + user.personnelnumber} style={{ textDecoration: "none" }}  >
                        //                         {user.role === 404 ?
                        //                             <>
                        //                             </>
                        //                             :
                        //                             <>
                        //                                 <AllUsers user={user} />
                        //                             </>}
                        //                     </Link>
                        //                 </div>

                        //         )
                        //     })}
                        // </ul>
                        <>
                        </>
                    }
                </div>
            </div>
        </>
    )
}
