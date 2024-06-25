import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./profile.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import AvatarUser from "../../components/avatarUser/AvatarUser";

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [user, setUser] = useState({});
    const personnelnumber = useParams().personnelnumber;

    useEffect(() => {
        const fetchUser = async () => {

            const res = await axios.get(`/users?personnelnumber=${personnelnumber}`)
            setUser(res.data)
        };
        fetchUser();
    }, [personnelnumber]);


    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">{
                            user.role === 1 ? <img className="profileCoverImg" src={user.coverPicture ? PF + user.coverPicture : PF + "person/n_operator.jpg"} alt="" />
                                : user.role === 3 ? <img className="profileCoverImg" src={user.coverPicture ? PF + user.coverPicture : PF + "person/n_wals.jpg"} alt="" />
                                    : user.role === 2 ? <img className="profileCoverImg" src={user.coverPicture ? PF + user.coverPicture : PF + "person/n_tl.jpg"} alt="" />
                                        : user.role === 0 ? <img className="profileCoverImg" src={user.coverPicture ? PF + user.coverPicture : PF + "person/n_admin.jpg"} alt="" />
                                            : user.role === 404 ? <img className="profileCoverImg" src={user.coverPicture ? PF + user.coverPicture : PF + "person/noCoverr.png"} alt="" />
                                                : <img className="profileCoverImg" src={PF + "person/noCover.png"} alt="" />}
                            <div className="profileUser">
                                <AvatarUser user={user} />
                            </div>
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username || user.personnelnumber}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed personnelnumber={personnelnumber} />
                        {user.role !== 404 ? <Rightbar user={user} /> : <></>}
                    </div>
                </div>
            </div>
        </>
    )
}
