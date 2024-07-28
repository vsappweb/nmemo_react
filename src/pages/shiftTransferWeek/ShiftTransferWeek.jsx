import React from "react";
import "./shiftTransferWeek.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

export default function ShiftTransferWeek() {
  return (
    <>
      <Topbar />
      <div className="shiftTransferWeek">
        <Sidebar />
        <div className="shiftTransferWeekRight">
          <div className="underDevelopmentContainer">
            <h2 className="underDevelopment">under development</h2>
            <h3 className="underDevelopmentTitle">
              Page <span>shiftTransferWeek</span>
            </h3>
            <h3 className="underDevelopmentSubtitle">coming soon</h3>
          </div>
        </div>
      </div>
    </>
  );
}
