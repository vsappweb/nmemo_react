import React from "react";
import "./newsBrief.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

export default function newsBrief() {
  const NEWS_BRIEF = process.env.REACT_APP_NEWS_BRIEF;
  console.log(NEWS_BRIEF);
  return (
    <>
      <Topbar />
      <div className="newsBrief">
        <Sidebar />
        <div className="newsBriefRight">
          <iframe width="100%" height="100%" src={NEWS_BRIEF}></iframe>
          <p>Only and exclusively for internal use</p>
          {/* <div className="underDevelopmentContainer">
            <h2 className="underDevelopment">under development</h2>
            <h3 className="underDevelopmentTitle">Page <span> News brief</span></h3>
            <h3 className="underDevelopmentSubtitle">coming soon</h3>
          </div> */}
        </div>
      </div>
    </>
  );
}
