import "./sidebar.css";
import { Chat, RateReview, Rule, Settings, WorkOutline, Event, LocalShipping, HealthAndSafety, ForwardToInbox } from "@mui/icons-material";
import AllUsers from "../allUsers/AllUsers";
import { Link } from "react-router-dom";

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

import SidebarSettings from "../sidebarSettings/SidebarSettings";

export default function Sidebar() {
    const [allUsers, setUsers] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axios.get("/users/usersList");
                setUsers(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUsers()
    }, []);

    function SidebarListItem(props) {
        return (
            <li className='sidebarListItem'>
                <span className="sidebarIcon"> {props.img} </span>
                <span className="sidebarListItemText"> {props.text} </span>
            </li>
        );
    }


    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <Link to={`/events/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                        <SidebarListItem img={<Event />} text={"Agenda"} />
                    </Link>
                    {/* <SidebarListItem img={<School />} text={"Courses"} />
                    <SidebarListItem img={<HelpOutline />} text={"Questions"} /> */}
                    <hr className="sidebarHr" />
                    <Link to={`/safety/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                        <SidebarListItem img={<HealthAndSafety />} text={"Safety"} />
                    </Link>
                    <Link to={`/logistics/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                        <SidebarListItem img={<LocalShipping />} text={"Logistics"} />
                    </Link>
                    <Link to={`/orders/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                        <SidebarListItem img={<WorkOutline />} text={"Orders/Products"} />
                    </Link>
                    <hr className="sidebarHr" />
                    {(user.role === 3 || user.role === 1) && <Link to={`/nMemo/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                        <SidebarListItem img={<RateReview />} text={"Leave memo IATF"} />
                    </Link>}
                    {user.role === 2 && <Link to={`/sendTlToLine/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                        <SidebarListItem img={<ForwardToInbox />} text={"Send info to Line"} />
                    </Link>}
                    {user.role === 3 && <Link to={`/editShiftTransfer/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                        <SidebarListItem img={<Rule />} text={"Check Shift Transfer"} imgSetting={<Settings />} />
                    </Link>}
                    <hr className="sidebarHr" />
                    <Link to={`/messenger`} style={{ textDecoration: "none" }}>
                        <SidebarListItem img={<Chat />} text={"Chats"} />
                    </Link>
                    {/* <Link to={`/groups/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                        <SidebarListItem img={<Group />} text={"Groups"} />
                    </Link> */}
                    {user.role === 0 || user.isAdmin === true ?
                        <>
                            <h5 className="sidebarSettingsTitle">Settings</h5>
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
    )
}
