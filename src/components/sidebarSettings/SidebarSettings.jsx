import "./sidebarSettings.css";
import { Rule, RateReview, Group, Person, Event, Settings } from "@mui/icons-material";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";


export default function SidebarSettings({user}) {

    const { t } = useTranslation();


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
                <SidebarListItem img={<Event />} text={t("sidebar.Agenda_setting")} imgSetting={<Settings />} />
            </Link>
            <Link to={`/editProfile/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                <SidebarListItem img={<Person />} text={t("sidebar.Edit_Profile")} imgSetting={<Settings />} />
            </Link>
            {/* <SidebarListItem img={<School />} text={t("sidebar.Courses")} />
                    <SidebarListItem img={<HelpOutline />} text={t("sidebar.Questions")} /> */}
            <hr className="sidebarHr" />
            {/* <Link to={`/safety/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                <SidebarListItem img={<HealthAndSafety />} text={t("sidebar.Safety")} />
            </Link>
            <Link to={`/logistics/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                <SidebarListItem img={<LocalShipping />} text={t("sidebar.Logistics")} />
            </Link>
            <Link to={`/orders/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                <SidebarListItem img={<WorkOutline />} text={t("sidebar.Orders")} />
            </Link> */}
            <Link to={`/nMemo/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                <SidebarListItem img={<RateReview />} text={t("sidebar.View_all_notes_IATF")} imgSetting={<Settings />}/>
            </Link>
            <Link to={`/editShiftTransfer/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                <SidebarListItem img={<Rule />} text={t("sidebar.Check_Shift_Transfer")} imgSetting={<Settings />}/>
            </Link>
            <hr className="sidebarHr" />
            <Link to={`/groups/${user.personnelnumber}`} style={{ textDecoration: "none" }}>
                <SidebarListItem img={<Group />} text={t("sidebar.Groups")} />
            </Link>
            <hr className="sidebarHr" />
        </>
    )
}
