import React from "react";
import "./logistics.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

export default function Logistics() {
  return (
    <>
      <Topbar />
      <div className="logistics">
        <Sidebar />
        <div className="logisticsRight">
          <div className="underDevelopmentContainer">
            <h2 className="underDevelopment">under development</h2>
            <h3 className="underDevelopmentTitle">
              Page <span>logistics</span>
            </h3>
            <h3 className="underDevelopmentSubtitle">coming soon</h3>
          </div>
        </div>
      </div>
    </>
  );
}
