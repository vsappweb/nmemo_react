import "./avatarUser.css";

export default function AvatarUser({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <div>
            {user?.role === 1 ? <img className="avatarUserImg" src={user?.profilePicture ? PF + user?.profilePicture : PF + "person/n_operator-a.jpg"} alt="" />
                : user?.role === 3 ? <img className="avatarUserImg" src={user?.profilePicture ? PF + user?.profilePicture : PF + "person/n_wals-a.jpg"} alt="" />
                    : user?.role === 2 ? <img className="avatarUserImg" src={user?.profilePicture ? PF + user?.profilePicture : PF + "person/n_tl-a.jpg"} alt="" />
                    : user?.role === 4 ? <img className="avatarUserImg" src={user?.profilePicture ? PF + user?.profilePicture : PF + "person/n_l-a.jpg"} alt="" />
                    : user?.role === 5 ? <img className="avatarUserImg" src={user?.profilePicture ? PF + user?.profilePicture : PF + "person/n_me-a.jpg"} alt="" />
                        : user?.role === 0 ? <img className="avatarUserImg" src={user?.profilePicture ? PF + user?.profilePicture : PF + "person/n_admin-a.jpg"} alt="" />
                        : user?.role === 404 ? <img className="avatarUserImg" src={user?.profilePicture ? PF + user?.profilePicture : PF + "person/deleted.jpg"} alt="" />
                            : <img className="avatarUserImg" src={PF + "person/noAvatar.png"} alt="" />}
        </div>
    )
}
