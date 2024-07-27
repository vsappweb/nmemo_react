import React from "react";
import "./test.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

export default function Test() {
  return (
    <>
      <Topbar />
      <div className="safety">
        <Sidebar />
        <div className="safetyRight">
          <div className="underDevelopmentContainer">
            <h2 className="underDevelopment">under development</h2>
            <h3 className="underDevelopmentTitle">
              Page <span> safety</span>
            </h3>
            <h3 className="underDevelopmentSubtitle">coming soon</h3>
          </div>
        </div>
      </div>
    </>
  );
}
