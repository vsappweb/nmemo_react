import React from "react";
import "./errorPage.css";
import { Link } from "react-router-dom";
// import Topbar from '../../components/topbar/Topbar'
// import Sidebar from '../../components/sidebar/Sidebar'

export default function ErrorPage() {
  return (
    <>
      <div className="safety">
        <div className="safetyRight">
          <div className="underDevelopmentContainer">
            <h2 className="underDevelopment">
              <span style={{ textTransform: "lowercase", fontWeight: "bold" }}>
                n
              </span>
              M
              <span style={{ textTransform: "lowercase", fontWeight: "bold" }}>
                emo
              </span>{" "}
              Error :(
            </h2>
            <br />
            <h3 className="underDevelopmentTitle">
              <span
                style={{ fontSize: "50px", fontWeight: "bold", color: "grey" }}
              >
                404
              </span>{" "}
              - Page Not Found
            </h3>
            <br />
            <h3 className="underDevelopmentSubtitle">
              Sorry, the page you are looking for could not be found.
            </h3>
            <br />
            <h3 className="underDevelopmentSubtitle">
              Please check the URL and try again.
            </h3>
            <br />
            <br />
            <Link to="/" style={{ textDecoration: "none" }}>
              <h3 className="underDevelopmentTitle">
                Or go to <span>Home page</span>
              </h3>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
