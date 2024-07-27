import { useContext, useEffect, useState } from "react";
import "./groups.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import AllUsers from "../../components/allUsers/AllUsers";
import { Link } from "react-router-dom";

export default function Groups() {
  const API = process.env.REACT_APP_SERVER_API;
  const [allUsers, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`${API}/users/usersList`);
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, [API]);

  return (
    <>
      <Topbar />
      <div className="groups">
        <Sidebar />

        <div className="groupsRight">
          <div className="groupsUser">
            <h3 className="groupsTitle">Operators</h3>
            {Object.values(allUsers).map((user) => {
              return (
                <Link
                  to={"/profile/" + user.personnelnumber}
                  style={{ textDecoration: "none" }}
                  key={user._id}
                >
                  {user.role === 1 ? (
                    <>
                      <AllUsers user={user} />
                    </>
                  ) : (
                    <></>
                  )}
                </Link>
              );
            })}
          </div>
          <div className="groupsUser">
            <h3 className="groupsTitle">Team leaders</h3>
            {Object.values(allUsers).map((user) => {
              return (
                <Link
                  to={"/profile/" + user.personnelnumber}
                  style={{ textDecoration: "none" }}
                  key={user._id}
                >
                  {user.role === 2 ? (
                    <>
                      <AllUsers user={user} />
                    </>
                  ) : (
                    <></>
                  )}
                </Link>
              );
            })}
          </div>
          <div className="groupsUser">
            <h3 className="groupsTitle">Wals</h3>
            {Object.values(allUsers).map((user) => {
              return (
                <Link
                  to={"/profile/" + user.personnelnumber}
                  style={{ textDecoration: "none" }}
                  key={user._id}
                >
                  {user.role === 3 ? (
                    <>
                      <AllUsers user={user} />
                    </>
                  ) : (
                    <></>
                  )}
                </Link>
              );
            })}
          </div>
          <div className="groupsUser">
            <h3 className="groupsTitle">Logistics</h3>
            {Object.values(allUsers).map((user) => {
              return (
                <Link
                  to={"/profile/" + user.personnelnumber}
                  style={{ textDecoration: "none" }}
                  key={user._id}
                >
                  {user.role === 4 ? (
                    <>
                      <AllUsers user={user} />
                    </>
                  ) : (
                    <></>
                  )}
                </Link>
              );
            })}
          </div>
          <div className="groupsUser">
            <h3 className="groupsTitle">Mechanics</h3>
            {Object.values(allUsers).map((user) => {
              return (
                <Link
                  to={"/profile/" + user.personnelnumber}
                  style={{ textDecoration: "none" }}
                  key={user._id}
                >
                  {user.role === 5 ? (
                    <>
                      <AllUsers user={user} />
                    </>
                  ) : (
                    <></>
                  )}
                </Link>
              );
            })}
          </div>
          {/* <div className="groupsUser">
            <h3 className="groupsTitle">KD</h3>
            {Object.values(allUsers).map((user) => {
              return (
                <Link to={"/profile/" + user.personnelnumber} style={{ textDecoration: "none" }} key={user._id} >
                  {user.role === 6 ?
                    <>
                      <AllUsers user={user} />
                    </>
                    :
                    <>
                    </>}
                </Link>
              )
            })}
          </div>
          <div className="groupsUser">
            <h3 className="groupsTitle">PLaning</h3>
            {Object.values(allUsers).map((user) => {
              return (
                <Link to={"/profile/" + user.personnelnumber} style={{ textDecoration: "none" }} key={user._id} >
                  {user.role === 7 ?
                    <>
                      <AllUsers user={user} />
                    </>
                    :
                    <>
                    </>}
                </Link>
              )
            })}
          </div> */}

          <div className="groupsUser ">
            <h3 className="groupsTitle">Admins</h3>
            {Object.values(allUsers).map((user) => {
              return (
                <Link
                  to={"/profile/" + user.personnelnumber}
                  style={{ textDecoration: "none" }}
                  key={user._id}
                >
                  {user.role === 0 || user.isAdmin === true ? (
                    // {user.role === 0 || user.role === 007 || user.isAdmin === true ?
                    <>
                      <AllUsers user={user} />
                    </>
                  ) : (
                    <></>
                  )}
                </Link>
              );
            })}
          </div>
          <div className="groupsUser">
            <h3 className="groupsTitle">Deleted</h3>
            {Object.values(allUsers).map((user) => {
              return (
                <Link
                  to={"/profile/" + user.personnelnumber}
                  style={{ textDecoration: "none" }}
                  key={user._id}
                >
                  {user.role === 404 ? (
                    <>
                      <AllUsers user={user} />
                    </>
                  ) : (
                    <></>
                  )}
                </Link>
              );
            })}
          </div>
          {/* <div className="groupsUser">
            <h3 className="groupsTitle">#####</h3>
            {Object.values(allUsers).map((user) => {
              return (
                <Link to={"/profile/" + user.personnelnumber} style={{ textDecoration: "none" }} key={user._id} >
                  {user.role === 007 ?
                    <>
                      <AllUsers user={user} />
                    </>
                    :
                    <>
                    </>}
                </Link>
              )
            })}
          </div> */}
          {/* <div className="underDevelopmentContainer">
            <h2 className="underDevelopment">under development</h2>
            <h3 className="underDevelopmentTitle">Page <span> groups</span> </h3>
            <h3 className="underDevelopmentSubtitle">coming soon</h3>
          </div> */}
        </div>
      </div>
    </>
  );
}
