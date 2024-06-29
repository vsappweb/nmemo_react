import "./rightbar.css";
import Online from "../online/Online";
import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client"
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";
import AvatarUser from "../avatarUser/AvatarUser";
import UserRole from "../userRole/UserRole"



export default function Rightbar({ user }) {
    const API = process.env.REACT_APP_SERVER_API
    const SOCKET = process.env.REACT_APP_SOCKET
    const date = new Date();
    const [friends, setFriends] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));
    const [onlineUsers, setOnlineUsers] = useState([])
    let [allEvents, setEvents] = useState([]);
    const socket = useRef()



    // get all events from database 
    useEffect(() => {
        let intervalId;
        const fetchData = async () => {
            try {
                const res = await axios.get(`${API}/events/allEvents`);
                if (res && res.data) {
                    setEvents(res.data);
                }
            } catch (err) {
                console.error(err);
            }
        };

        const startInterval = () => {
            intervalId = setInterval(fetchData, 5000);
        };

        const stopInterval = () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };

        startInterval();

        return () => {
            stopInterval();
        };
    }, [API]);

    useEffect(() => {
        socket.current = io(`${SOCKET}`);
        socket.current.emit("sendUser", currentUser._id);
        socket.current.on("getUsers", (users) => {
            setOnlineUsers(
                currentUser.followings.filter((f) => users.some((u) => u.userId === f))
            );
        });
    }, [currentUser._id, currentUser.followings, SOCKET]);

    useEffect(() => {
        const getFriends = async () => {
            if (!user?._id) {
                return;
            }
            try {
                const friendList = await axios.get(`${API}/users/friends/${user?._id}`);
                setFriends(friendList?.data);
            } catch (err) {
                console.error("Failed to get friends:", err);
            }
        }
        getFriends();
    }, [user, API]);


    // useEffect(() => {
    //     const getFriends = async () => {
    //         try {
    //             //! Need to leave (`/users/friends/${user?._id}`) not (`/users/friends/${currentUser?._id}`) !!!
    //             const friendList = await axios.get(`/users/friends/${user?._id}`);
    //             setFriends(friendList?.data);
    //         } catch (err) {
    //             console.log("This is not an error, see the comment in the code");
    //         }
    //     }
    //     getFriends();
    // }, [user]);


    // useEffect(() => {
    //     const getFriends = async () => {
    //         try {
    //             const friendList = await axios.get(`/users/friends/${currentUser?._id}`);
    //             setFriends(friendList?.data);
    //         } catch (err) {
    //             console.log(err, "Uups");
    //         }
    //     }
    //     getFriends();
    // }, [currentUser]);

    const handleClick = async () => {
        try {
            if (followed) {
                await axios.put(`${API}/users/${user._id}/unfollow`, { userId: currentUser._id, });
                dispatch({ type: "UNFOLLOW", payload: user._id });
            } else {
                await axios.put(`${API}/users/${user._id}/follow`, { userId: currentUser._id, });
                dispatch({ type: "FOLLOW", payload: user._id })
            }
        } catch (err) {
            console.log(err + "haaa");
        }
        setFollowed(!followed);
    }

    const showRightbar = () => {
        document.querySelector(".rightbar").classList.toggle("active");
        document.querySelector(".rightbarBurger").classList.toggle("active");
        document.querySelector(".rightbarBurgerLineOne").classList.toggle("active");
        document.querySelector(".rightbarBurgerLineTwo").classList.toggle("active");
        document.querySelector(".rightbarBurgerLineThree").classList.toggle("active");
    }

    const HomeRightbar = () => {
        return (
            <>
                <h4 className="rightbarTitle">Here you can view the events on the agenda</h4>
                <ul className="feedEventsList">
                    {Object.values(allEvents).map((event) => {
                        return (
                            <li className="feedEventsInformation" key={event._id}>
                                {event.start.split('T')[0] === date.toLocaleDateString("fr-CA") ?
                                    <div className="feedEventsInformationContent">
                                        <p className="feedEventsInformationHeader">Today:</p>
                                        <p className="feedEventsInformationTitle">{event.title}</p>
                                        <p className="feedEventsInformationDesc">{event.desc}</p>
                                    </div>
                                    : <></>}
                            </li>
                        )
                    })}
                </ul>
                <hr className="sidebarHr" />
                <h4 className="rightbarTitle">Here you can submit a report for your team leader</h4>

                <hr className="sidebarHr" />
                {/* <h4 className="rightbarTitle">Main page nMemo</h4>
                <p className="rightbarTitle">Rightbar</p> */}
                {/* //TODO Show all online friends, not just followers */}
                <Online onlineUsers={onlineUsers} currentId={currentUser._id} />
            </>


        );
    };
    const ProfileRightbar = () => {
        return (
            <>
                {(user.role === 404 || user.personnelnumber !== currentUser.personnelnumber) && (
                    <button className="rightbarFollow" onClick={handleClick}>
                        {/* //FIXME The button does not work correctly */}
                        {followed ? "Unfollow" : "Follow"}
                        {followed ? <Remove /> : <Add />}
                    </button>
                )}
                <h4 className="rightbarTitle">User Information</h4>
                {user.role !== 404 ? <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Id:</span>
                        <span className="rightbarInfoValue">{user._id}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Email:</span>
                        <span className="rightbarInfoValue">{user.email}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Your Nr:</span>
                        <span className="rightbarInfoValue">{user.personnelnumber}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Role:</span>
                        <UserRole user={user} />
                    </div>
                </div> : <span>No information</span>}
                <h4 className="rightbarTitle">Your Line (Wals)</h4>
                <div className="rightbarFollowings">
                    {friends?.map((friend) => {
                        return (
                            <Link to={"/profile/" + friend.personnelnumber} style={{ textDecoration: "none" }} key={friend._id}>
                                <div className="rightbarFollowing">
                                    {friend.role === 404 ?
                                        <>
                                        </>
                                        :
                                        <>
                                            <div className="avatarFriend">
                                                <AvatarUser user={friend} />
                                            </div>
                                            {/* <AvatarFriend friend={friend} /> */}
                                            <span className="rightbarFollowingName">{friend.username || friend.personnelnumber}</span>
                                        </>
                                    }
                                </div>
                            </Link>
                        )
                    })}
                </div>
                <h4 className="rightbarTitle">Your Team leaders</h4>
            </>
        )
    }
    return (
        <>
            <div className="rightbarBurger" onClick={() => { showRightbar() }} >
                <div className="rightbarBurgerLineOne"></div>
                <div className="rightbarBurgerLineTwo"></div>
                <div className="rightbarBurgerLineThree"></div>
            </div>
            <div className="rightbar">
                <div className="rightbarWrapper">
                    {user ? <ProfileRightbar /> : <HomeRightbar />}
                </div>
            </div>
        </>
    )
}
