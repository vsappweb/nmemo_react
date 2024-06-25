import "./sidebarSettings.css";
import { Rule, RateReview, Group, Person, Event, Settings } from "@mui/icons-material";
import { Link } from "react-router-dom";


export default function SidebarSettings({user}) {


    function SidebarListItem(props) {
        return (
            <li className='sidebarListItem'>
                <span className="sidebarIcon"> {props.img} </span>
                <span className="sidebarListItemText"> {props.text} </span>
                <span className="sidebarIcon"> {props.imgSetting} </span>
            </li>
        );
    }


    return (
        <>
            <hr className="sidebarHr" />
            <Link to={`/editEvents/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                <SidebarListItem img={<Event />} text={"Agenda setting"} imgSetting={<Settings />} />
            </Link>
            <Link to={`/editProfile/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                <SidebarListItem img={<Person />} text={"Edit Profile"} imgSetting={<Settings />} />
            </Link>
            {/* <SidebarListItem img={<School />} text={"Courses"} />
                    <SidebarListItem img={<HelpOutline />} text={"Questions"} /> */}
            <hr className="sidebarHr" />
            {/* <Link to={`/safety/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                <SidebarListItem img={<HealthAndSafety />} text={"Safety"} />
            </Link>
            <Link to={`/logistics/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                <SidebarListItem img={<LocalShipping />} text={"Logistics"} />
            </Link>
            <Link to={`/orders/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                <SidebarListItem img={<WorkOutline />} text={"Orders"} />
            </Link> */}
            <Link to={`/nMemo/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                <SidebarListItem img={<RateReview />} text={"View all notes IATF"} imgSetting={<Settings />}/>
            </Link>
            <Link to={`/editShiftTransfer/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                <SidebarListItem img={<Rule />} text={"Check Shift Transfer"} imgSetting={<Settings />}/>
            </Link>
            <hr className="sidebarHr" />
            <Link to={`/groups/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                <SidebarListItem img={<Group />} text={"Groups"} />
            </Link>
            <hr className="sidebarHr" />
        </>
    )
}
