import "./postShiftTransfer.css";
import AvatarUser from "../avatarUser/AvatarUser";
import AllUsers from "../allUsers/AllUsers";
import { AddComment, HighlightOff } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";

export default function PostShiftTransfer({ shiftTransfer }) {
    const [user, setUser] = useState({});
    const { user: currentUser } = useContext(AuthContext);
    const [allUsers, setUsers] = useState([]);



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



    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${shiftTransfer.userId}`)
            setUser(res.data)
        };
        fetchUser();
    }, [shiftTransfer.userId]);

    const shiftTransferDeleteHandler = () => {
        try {
            axios.delete("/shiftTransfers/" + shiftTransfer._id)
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
                        {/* <span className="postShiftTransferOperator">{shiftTransfer?.operator}</span> */}
                        {/* <MoreVert /> */}
                        {shiftTransfer.userId === currentUser._id ? <HighlightOff className="postShiftTransferDelete" onClick={shiftTransferDeleteHandler} />
                            : <AddComment className="postShiftTransferDelete" />}
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
