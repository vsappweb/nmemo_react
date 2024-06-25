import "./roleUser.css";

export default function RoleUser({ user }) {
    return (
        <>
            <option className="editProfileInput" value="1">Operator</option>
            <option className="editProfileInput" value="2">Team leader</option>
            <option className="editProfileInput" value="3">Wals</option>
            <option className="editProfileInput" value="4">Logistics</option>
            <option className="editProfileInput" value="5">Mechanic</option>
            <option className="editProfileInput" value="6">KD</option>
            <option className="editProfileInput" value="7">PLaning</option>
            <option className="editProfileInput" value="0">Admin</option>
            <option className="editProfileInput" value="007">Root</option>
        </>
    )
}
