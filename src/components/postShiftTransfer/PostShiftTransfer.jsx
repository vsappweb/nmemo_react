import "./postShiftTransfer.css";
import AvatarUser from "../avatarUser/AvatarUser";
import AllUsers from "../allUsers/AllUsers";
import { HighlightOff, MoreVert, Edit, DoNotTouch } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import { renderToString } from 'react-dom/server'
import  DateTimeShift  from "../dateTimeShift/DateTimeShift";

export default function PostShiftTransfer({ shiftTransfer }) {
    const API = process.env.REACT_APP_SERVER_API
    const [user, setUser] = useState({});
    const { user: currentUser } = useContext(AuthContext);
    const [allUsers, setUsers] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const date = new Date();
    const shiftNow = renderToString(<DateTimeShift />)

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



    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`${API}/users?userId=${shiftTransfer.userId}`)
            setUser(res.data)
        };
        fetchUser();
    }, [shiftTransfer.userId, API]);

    const shiftTransferDeleteHandler = () => {
        try {
            axios.delete(`${API}/shiftTransfers/` + shiftTransfer._id)
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    }





    return (
        <div className="postShiftTransfer">
            <div className="postShiftTransferWrapper">
                {/* {shiftTransfer.userId === currentUser._id ? <HighlightOff className="postShiftTransferDelete" onClick={shiftTransferDeleteHandler} />
                            : <AddComment className="postShiftTransferDelete" />} */}
                <div className="postShiftTransferTop">
                    <div className="postShiftTransferTopLeft">
                        <Link to={`profile/${user.personnelnumber}`}>
                            <div className="avatarUser">
                                <AvatarUser user={user} />
                            </div>
                        </Link>
                        <span className="postShiftTransferPersonnelnumber">{user.username || user.personnelnumber}</span>
                    </div>
                    <p className="shiftTransferDateTimeItem">Shift: <span>{shiftTransfer?.shift}</span></p>
                    <div className="postShiftTransferTopRight">
                        {Object.values(allUsers).map((userOperator) => {
                            return (
                                <Link className="postShiftTransferOperatorLink" to={"/profile/" + userOperator.personnelnumber} style={{ textDecoration: "none" }} key={userOperator._id} >
                                    {userOperator.personnelnumber === shiftTransfer?.operator ?
                                        <>
                                            <AllUsers user={userOperator} />
                                        </>
                                        :
                                        <>
                                        </>}
                                </Link>
                            )
                        })}
                        {isMenuOpen && <div className="postTopEditDel">
                            {shiftTransfer.userId === currentUser._id && shiftTransfer?.shift === shiftNow && shiftTransfer?.date === date.toLocaleDateString('nl-NL')  ?
                                <div className="editDeleteBtns">
                                    <div className="notActiveBtn">
                                        <Edit onClick={() => setIsMenuOpen(!isMenuOpen)} />
                                    </div>
                                    <div className="deleteBtn" onClick={shiftTransferDeleteHandler} >
                                        <HighlightOff />
                                    </div>
                                </div>
                                :
                                <div className="deleteBtn">
                                    <DoNotTouch onClick={() => setIsMenuOpen(!isMenuOpen)} />
                                </div>
                            }
                        </div>}
                        <MoreVert className="postMenu" style={{ cursor: "pointer" }} onClick={() => setIsMenuOpen(!isMenuOpen)} />
                        {/* <span className="postShiftTransferOperator">{shiftTransfer?.operator}</span> */}
                        {/* <MoreVert /> */}
                        {/* {shiftTransfer.userId === currentUser._id ? <HighlightOff className="postShiftTransferDelete" onClick={shiftTransferDeleteHandler} /> 
                            : <AddComment className="postShiftTransferDelete" />}*/}
                    </div>
                </div>
                <div className="postShiftTransferCenter" style={{ color: "red" }}>

                    <ul className="postShiftTransferCenterList">
                        {shiftTransfer?.shiftTransferItems.length === 0 ? <li className="postShiftTransferCenterItem" style={{ color: "green", fontWeight: "bold" }}><span>All Okey 😃</span></li> : null}
                        {Object.values(shiftTransfer.shiftTransferItems).map((item, index) => {
                            return (
                                <li className="postShiftTransferCenterItem" key={index}>
                                    <h3 className="postShiftTransferCenterItemTitle">{item.title}</h3>
                                    <p className="postShiftTransferCenterItemValue">{item.value}</p>
                                    {item.value === "N.V.T." ? <span>☹️</span> : <span>😡</span>}
                                </li>
                            );
                        })}
                    </ul>
                    {shiftTransfer?.message ? <p className="postShiftTransferComment">Comment: <span className="postShiftTransferText">{shiftTransfer?.message}</span></p> : null}

                </div>
                <div className="postShiftTransferBottom" style={{ display: "flex", flexDirection: "column" }}>
                    <div className="shiftTransferDateTime" style={{ textTransform: "capitalize" }}>
                        <p className="shiftTransferDateTimeItem">Week: <span>{shiftTransfer?.weekNumber}</span></p>
                        <p className="shiftTransferDateTimeItem">Day : <span>{shiftTransfer?.weekday}</span></p>
                        <p className="shiftTransferDateTimeItem">Date : <span>{shiftTransfer?.date}</span></p>

                    </div>
                    <span className="postShiftTransferDate">{format(shiftTransfer.createdAt)}</span>
                </div>
            </div>
        </div>
    )
}
