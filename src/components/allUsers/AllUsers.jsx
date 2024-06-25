import "./allUsers.css";
import AvatarUser from "../avatarUser/AvatarUser";


export default function AllUsers({ user }) {
    return (

        <div className="sidebarFriend" >
            <div className="avatarUser">
                <AvatarUser user={user} />
            </div>
            <span className="sidebarFriendName">{user.username || user.personnelnumber}</span>
        </div>
    )
}
