import "./userRole.css";

export default function UserRole({ user }) {

    return (
        <span className="rightbarInfoValue">{
            user.role === 1 ? "Operators"
                : user.role === 2 ? "Team leaders"
                    : user.role === 3 ? "Wals"
                        : user.role === 4 ? "Logistics"
                            : user.role === 5 ? "Mechanic"
                                : user.role === 0 ? "Administrators"
                                    : "Ask admin :)"}</span>
    )
}
