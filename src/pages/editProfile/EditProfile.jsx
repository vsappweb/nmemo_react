import "./editProfile.css"
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useRef, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { AddAPhoto, Cancel, AddPhotoAlternate } from "@mui/icons-material"
import RoleUser from "../../components/roleUser/RoleUser";
import axios from "axios";



export default function EditProfile() {
  const API = process.env.REACT_APP_SERVER_API;
  const { user } = useContext(AuthContext);
  const userId = useRef();
  const email = useRef();
  const personnelnumber = useRef();
  const username = useRef();
  const usernameReg = useRef();
  const role = useRef();
  const desc = useRef();
  const emailReg = useRef();
  const personnelnumberReg = useRef();
  const passwordReg = useRef();
  const passwordAgainReg = useRef();
  const roleReg = useRef();
  const userIdDel = useRef();
  const userIsAdmin = useRef();
  // const userIsAdminYes = useRef();
  const userIsAdminCheck = useRef();
  const userIdRem = useRef();
  const personnelnumberRem = useRef();
  const usernameRem = useRef();
  const changePassword = useRef();
  const changePasswordAgain = useRef();
  const changePasswordUserId = useRef();

  const [isChecked, setIsChecked] = useState(false);

  const [fileProfilePicture, setFileProfilePicture] = useState(null);
  const [fileCoverPicture, setFileCoverPicture] = useState(null);



  const [editUser, setEditUser] = useState({})
  const [removeUser, setRemoveUser] = useState({})
  const [isAdminUser, setIsAdminUser] = useState({})



  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const getEditUser = async (userId) => {
    try {
      console.log(userId.current.value)
      const res = await axios.get(`${API}/users?userId=${userId.current.value}`)
      console.log(res.data)
      setEditUser(res.data)
      document.getElementById("editProfileForm").reset();
      console.log(editUser.role)
    } catch (err) {
      console.log(err)
    }
  }
  const getEditUserRem = async (userIdRem) => {
    try {
      console.log(userIdRem.current.value)
      const res = await axios.get(`${API}/users?userId=${userIdRem.current.value}`)
      console.log(res.data)
      setRemoveUser(res.data)
      console.log(editUser.username)
    } catch (err) {
      console.log(err)
    }
  }
  const getEditUserIsAdmin = async (userIsAdmin) => {
    try {
      console.log(userIsAdmin.current.value)
      const res = await axios.get(`${API}/users?userId=${userIsAdmin.current.value}`)
      console.log(res.data)
      setIsAdminUser(res.data)
      setIsChecked(res.data.isAdmin)
      console.log(res.data.username)
      console.log(res.data.isAdmin)
    } catch (err) {
      console.log(err)
    }
  }


  //* Function edit user profile*/ 

  const handleClickEdit = async (e) => {
    e.preventDefault();

    const dataCoverPicture = new FormData();
    const uniqueSuffixCoverPicture = Date.now() + '-' + Math.round(Math.random() * 1E9)
    let fileNameCoverPicture = uniqueSuffixCoverPicture + fileCoverPicture?.name;
    dataCoverPicture.append("name", fileNameCoverPicture);
    dataCoverPicture.append("file", fileCoverPicture);
    if (fileCoverPicture?.name === undefined) {
      fileNameCoverPicture = ''
    }

    const dataProfilePicture = new FormData();
    const uniqueSuffixProfilePicture = Date.now() + '-' + Math.round(Math.random() * 1E9)
    let fileNameProfilePicture = uniqueSuffixProfilePicture + fileProfilePicture?.name;
    dataProfilePicture.append("name", fileNameProfilePicture);
    dataProfilePicture.append("file", fileProfilePicture);
    if (fileProfilePicture?.name === undefined) {
      fileNameProfilePicture = ''
    }

    const user = {
      userId: userId.current.value,
      personnelnumber: personnelnumber.current.value,
      username: username.current.value,
      email: email.current.value,
      role: role.current.value,
      profilePicture: fileNameProfilePicture,
      coverPicture: fileNameCoverPicture,
      desc: desc.current.value
    };
    try {
      // console.log("test 3",userId.current.value)
      // console.log("test 3",personnelnumber.current.value)
      // console.log("test 3",user)
      await axios.post(`${API}/upload`, dataCoverPicture);
      await axios.post(`${API}/upload`, dataProfilePicture);
      await axios.put(`${API}/users/` + userId.current.value, user);
      // navigate("/")
      // localStorage.clear();
      window.location.reload();
    } catch (err) {
      console.log(err)
    }
  };

  //* Function reset password */ 

  const handleClickСhangePassword = async (e) => {
    e.preventDefault();
    if (changePasswordAgain.current.value !== changePassword.current.value) {
      changePassword.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        userId: changePasswordUserId.current.value,
        password: changePassword.current.value,
      };
      try {
        console.log(changePassword)
        console.log(changePasswordAgain)
        await axios.put(`${API}/users/` + changePasswordUserId.current.value, user);
        window.location.reload();
      } catch (err) {
        console.log(err)
      }
    }
  }


  //* Function register a user */ 

  const handleClickRegister = async (e) => {
    e.preventDefault();
    if (passwordAgainReg.current.value !== passwordReg.current.value) {
      passwordReg.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        personnelnumber: personnelnumberReg.current.value,
        username: usernameReg.current.value,
        email: emailReg.current.value,
        password: passwordReg.current.value,
        role: roleReg.current.value,
      };
      try {
        console.log("test start")
        console.log(user)
        await axios.post(`${API}/auth/register`, user);
        console.log("test end")
        window.location.reload();
      } catch (err) {
        console.log(err)
      }
    }
  };


  //* Function remove a user */ 

  const handleClickRemove = async (e) => {
    e.preventDefault();
    const uniqueSuffix = Date.now() + '@' + Math.round(Math.random() * 1E9) + '.del'
    const user = {
      userId: userIdRem.current.value,
      personnelnumber: userIdRem.current.value,
      username: "Deleted",
      email: uniqueSuffix,
      followers: [],
      followings: [],
      role: "404",
      profilePicture: "person/deleted.jpg",
      coverPicture: "person/noCover.png",
      ghostnumber: personnelnumberRem.current.value,
      ghostname: usernameRem.current.value,
    };
    try {
      console.log(userIdRem.current.value)
      console.log(user)

      await axios.put(`${API}/users/` + userIdRem.current.value, user);
      window.location.reload();
    } catch (err) {
      console.log(err)
    }

  }

  //* Function delete a user */ 

  const handleClickDelete = async (e) => {
    e.preventDefault();
    const user = {
      userId: userIdDel.current.value
    };
    try {
      await axios.delete(`${API}/users/` + userIdDel.current.value, user);
      window.location.reload();
    } catch (err) {
      console.log(err)
    }
  };

  const handleClickAddAdmin = async (e) => {
    e.preventDefault();
    const user = {
      isAdmin: userIsAdminCheck.current.value
    };
    try {
      console.log(userIsAdminCheck.current.value)

      await axios.put(`${API}/users/` + userIsAdmin.current.value, user);
      // window.location.reload();
    } catch (err) {
      console.log(err)
    }
  };


  return (
    <>

      {/* //TODO add language option to editProfile  */}
      <Topbar />
      <div className="editProfile">
        <Sidebar />

        <div className="editProfileRight">
          <div className="editProfileRightEdit">
            <h3 className="editProfileTitle" style={{ color: "blue" }} >{editUser._id === undefined ? `Edit your data ${user.username || user.personnelnumber}` : `Edit data for ${editUser.username || editUser.personnelnumber}`}</h3>
            {user?.role === 0 ? <span style={{ textAlign: "center" }}>Your ID: {user._id}</span> : <span style={{ display: "none" }}></span>}
            <form className="editProfileForm" id="editProfileForm" onSubmit={handleClickEdit}>
              <label className="editProfileFormItem" htmlFor="userId">
                <p className="editProfileFormText">User ID:</p> {user?.role === 0 ? <> <button className="editProfileButtonGet" onClick={() => getEditUser(userId)} >Get</button> <input className="editProfileInput" id="userId" ref={userId} placeholder="userId" type="text" defaultValue={editUser._id} required /></> :
                  <input className="editProfileInput" id="userId" ref={userId} placeholder="userId" defaultValue={user._id} type="text" readOnly required disabled />}
              </label>
              <label className="editProfileFormItem" htmlFor="personnelnumber">
                <p className="editProfileFormText">Personnelnumber:</p>
                {user?.role === 0 ? <input className="editProfileInput" id="personnelnumber" ref={personnelnumber} placeholder="Your personnelnumber" defaultValue={editUser._id !== undefined ? editUser.personnelnumber : userId ? user.personnelnumber : ""} type="text" required /> :
                  <input className="editProfileInput" id="personnelnumber" ref={personnelnumber} placeholder="Your personnelnumber" defaultValue={editUser._id !== undefined ? editUser.personnelnumber : userId ? user.personnelnumber : ""} type="text" required readOnly disabled />}
              </label>
              <label className="editProfileFormItem" htmlFor="username">
                <p className="editProfileFormText">Username:</p> <input className="editProfileInput" id="username" ref={username} placeholder="Your username" defaultValue={editUser._id !== undefined ? editUser.username : user.username} type="text" />
              </label>
              <label className="editProfileFormItem" htmlFor="email">
                <p className="editProfileFormText">Email / Login:</p> <input className="editProfileInput" id="email" ref={email} placeholder="Your email" defaultValue={editUser._id !== undefined ? editUser.email : user.email} type="email" required />
              </label>
              <label className="editProfileFormItem" htmlFor="desc">
                <p className="editProfileFormText">Description:</p> <input className="editProfileInput" id="desc" ref={desc} placeholder="Your description" defaultValue={editUser._id !== undefined ? editUser.desc : user.desc} type="text" />
              </label>
              <div className="editProfilePictures">
                <label className="editProfileFormItemP" htmlFor="fileProfilePicture">
                  <fieldset className="editProfileBorderPicture">
                    <legend className="editProfileBorderTitle">Profile picture:</legend>
                    {fileProfilePicture && (
                      <div className="editProfileImgContainer">
                        <img className="editProfileImg" src={URL.createObjectURL(fileProfilePicture)} alt="editProfileImg" />
                        <Cancel htmlColor="red" className="editProfileImgCancel" onClick={() => setFileProfilePicture(null)} />
                      </div>
                    )}
                    <AddAPhoto />
                    <input style={{ display: "none" }} className="editProfileInput" type="file" id="fileProfilePicture" accept=".png, .jpeg, .jpg" onChange={(e) => setFileProfilePicture(e.target.files[0])} defaultValue={editUser._id !== undefined ? editUser.profilePicture : user.profilePicture} />
                  </fieldset>
                </label>
                <label className="editProfileFormItemP" htmlFor="fileCoverPicture">
                  <fieldset className="editProfileBorderPicture">
                    <legend className="editProfileBorderTitle">Cover picture:</legend>
                    {fileCoverPicture && (
                      <div className="editProfileImgContainer">
                        <img className="editProfileImg" src={URL.createObjectURL(fileCoverPicture)} alt="editProfileImg" />
                        <Cancel htmlColor="red" className="editProfileImgCancel" onClick={() => setFileCoverPicture(null)} />
                      </div>
                    )}
                    <AddPhotoAlternate /> <input style={{ display: "none" }} className="editProfileInput" type="file" id="fileCoverPicture" accept=".png, .jpeg, .jpg" onChange={(e) => setFileCoverPicture(e.target.files[0])} />
                  </fieldset>
                </label>
              </div>
              {/* <fieldset className="editProfileBorder">
              <legend className="editProfileBorderTitle">Select a group:</legend> */}
              {editUser?._id !== undefined ?
                <select className="editProfileInput" ref={role} defaultValue={editUser.role} user={user} style={{ margin: "0 auto" }}>
                  <RoleUser />
                  {/* <option className="editProfileInput" value="1">Operator</option>
                  <option className="editProfileInput" value="2">Team leader</option>
                  <option className="editProfileInput" value="3">Wals</option>
                  <option className="editProfileInput" value="4">Logistics</option>
                  <option className="editProfileInput" value="5">Mechanic</option>
                  <option className="editProfileInput" value="6">KD</option>
                  <option className="editProfileInput" value="7">PLaning</option>
                  <option className="editProfileInput" value="0">Admin</option>
                  <option className="editProfileInput" value="007">Root</option> */}
                </select>
                : <fieldset className="editProfileBorder">
                  <legend className="editProfileBorderTitle">Select a group:</legend>
                  {user.role === 0 ? <select className="editProfileInput" ref={role} defaultValue={user.role} user={user}>
                    <RoleUser />
                    {/* <option className="editProfileInput" value="1">Operator</option>
                    <option className="editProfileInput" value="2">Team leader</option>
                    <option className="editProfileInput" value="3">Wals</option>
                    <option className="editProfileInput" value="4">Logistics</option>
                    <option className="editProfileInput" value="5">Mechanic</option>
                    <option className="editProfileInput" value="6">KD</option>
                    <option className="editProfileInput" value="7">PLaning</option>
                    <option className="editProfileInput" value="0">Admin1</option>
                    <option className="editProfileInput" value="007">Root</option> */}
                  </select>
                    : <select className="editProfileInput" ref={role} defaultValue={user.role} user={user} disabled >
                      <RoleUser />
                      {/* <option className="editProfileInput" value="1">Operator</option>
                      <option className="editProfileInput" value="2">Team leader</option>
                      <option className="editProfileInput" value="3">Wals</option>
                      <option className="editProfileInput" value="4">Logistics</option>
                      <option className="editProfileInput" value="5">Mechanic</option>
                      <option className="editProfileInput" value="6">KD</option>
                      <option className="editProfileInput" value="7">PLaning</option>
                      <option className="editProfileInput" value="0">Admin</option>
                      <option className="editProfileInput" value="007">Root</option> */}
                    </select>}
                </fieldset>}
              <button className="editProfileBtn" type="submin" style={{ color: "blue" }} >{editUser._id !== undefined ? "Edit data" : "edit my data"}</button>
            </form>

            {/* Form for change password */}

            <h3 className="editProfileTitle" style={{ color: "deepblue" }} >Сhange password</h3>
            <form className="editProfileForm" onSubmit={handleClickСhangePassword}>
              <label className="editProfileFormItem" htmlFor="changePasswordUserId">
                <p className="editProfileFormText">User ID:</p> {user?.role === 0 ? <input className="editProfileInput" id="changePasswordUserId" ref={changePasswordUserId} placeholder="userId" type="text" required /> :
                  <input className="editProfileInput" id="changePasswordUserId" ref={changePasswordUserId} placeholder="userId" defaultValue={user._id} type="text" readOnly required disabled />}
              </label>
              <label className="editProfileFormItem" htmlFor="changePassword">
                <p className="editProfileFormText">Password:</p><input className="editProfileInput" id="changePassword" ref={changePassword} placeholder="Password" type="password" minLength="6" required />
              </label>
              <label className="editProfileFormItem" htmlFor="changePasswordAgain">
                <p className="editProfileFormText">Password again:</p><input className="editProfileInput" id="changePasswordAgain" ref={changePasswordAgain} placeholder="Password Again" type="password" minLength="6" required />
              </label>
              <button className="editProfileBtn" type="Submit" style={{ color: "deepblue" }} >Change</button>
            </form>

          </div>


          {user?.role === 0 || user.isAdmin === true ? <div className="editProfileRightRegister">

            {/* Form registration */}

            <h3 className="editProfileTitle" style={{ color: "green" }} >Form registration a new user</h3>
            <form className="editProfileForm" onSubmit={handleClickRegister}>
              <label className="editProfileFormItem" htmlFor="personnelnumber">
                <p className="editProfileFormText">Personnelnumber:</p><input className="editProfileInput" ref={personnelnumberReg} placeholder="Personnelnumber" type="text" required />
              </label>

              <label className="editProfileFormItem" htmlFor="usernameReg">
                <p className="editProfileFormText">Username:</p> <input className="editProfileInput" id="usernameReg" ref={usernameReg} placeholder="Your username" type="text" required />
              </label>

              <label className="editProfileFormItem" htmlFor="email">
                <p className="editProfileFormText">Email / Login:</p><input className="editProfileInput" ref={emailReg} placeholder="Email" type="email" required />
              </label>

              <label className="editProfileFormItem" htmlFor="password">
                <p className="editProfileFormText">Password:</p><input className="editProfileInput" ref={passwordReg} placeholder="Password" type="password" minLength="6" required />
              </label>
              <label className="editProfileFormItem" htmlFor="passwordAgain">
                <p className="editProfileFormText">Password again:</p><input className="editProfileInput" ref={passwordAgainReg} placeholder="Password Again" type="password" minLength="6" required />
              </label>
              <fieldset className="editProfileBorder">
                <legend className="editProfileBorderTitle">Select a group:</legend>
                <select className="editProfileInput" ref={roleReg} user={user}>
                  <RoleUser />
                  {/* <option className="editProfileInput" value="1">Operator</option>
                  <option className="editProfileInput" value="2">Team leader</option>
                  <option className="editProfileInput" value="3">Wals</option>
                  <option className="editProfileInput" value="4">Logistics</option>
                  <option className="editProfileInput" value="5">Mechanic</option>
                  <option className="editProfileInput" value="6">KD</option>
                  <option className="editProfileInput" value="7">PLaning</option>
                  <option className="editProfileInput" value="0">Admin</option>
                  <option className="editProfileInput" value="007">Root</option> */}
                </select>
              </fieldset>
              <button className="editProfileBtn" type="Submit" style={{ color: "green" }} >Sign Up</button>
            </form>

            {/* Form remove user */}

            <h3 className="editProfileTitle" style={{ color: "orange" }}>Remove a user</h3>
            <span style={{ textAlign: "center", color: "orange" }}>User data will remain</span>
            <form className="editProfileForm" onSubmit={handleClickRemove}>
              <label className="editProfileFormItem" htmlFor="remUserId" style={{ color: "orange" }} >
                <p className="editProfileFormText" style={{ color: "orange" }} >User ID:</p> <button className="editProfileButtonGet" onClick={() => getEditUserRem(userIdRem)} >Get</button><input className="editProfileInput" id="remUserId" ref={userIdRem} placeholder="userId" type="text" required />
              </label>
              <label className="editProfileFormItem" htmlFor="personnelnumberRem" style={{ color: "orange" }} >
                <p className="editProfileFormText">Personnelnumber:</p> <input className="editProfileInput" id="personnelnumberRem" ref={personnelnumberRem} placeholder={removeUser._id === undefined ? "Personnelnumber" : `Enter please: ${removeUser?.personnelnumber}`} type="text" required />
              </label>
              <label className="editProfileFormItem" htmlFor="usernameRem" style={{ color: "orange" }} >
                <p className="editProfileFormText">Username:</p> <input className="editProfileInput" id="usernameRem" ref={usernameRem} placeholder="Username" type="text" defaultValue={removeUser?.username} required />
              </label>

              <button className="editProfileBtn" type="Submit" style={{ color: "orange" }} >REMOVE</button>
            </form>

            {/* Form delete user */}
            {user?.role === 0 && user?.isAdmin ?
              <>
                <h3 className="editProfileTitle" style={{ color: "red" }} >Delete a user</h3>
                <span style={{ textAlign: "center" }}>User data will be deleted</span>
                <form className="editProfileForm" onSubmit={handleClickDelete}>
                  <label className="editProfileFormItem" htmlFor="delUserId" style={{ color: "red" }} >
                    <p className="editProfileFormText" style={{ color: "red" }} >User ID:</p> <input className="editProfileInput" id="delUserId" ref={userIdDel} placeholder="userId" type="text" required />
                  </label>
                  <button className="editProfileBtn" type="Submit" style={{ color: "red" }}>DELETE</button>
                </form>
              </>
              :
              <>
                <h3 className="editProfileTitle" style={{ color: "red" }} >Delete a user</h3>
                <span style={{ textAlign: "center" }}>User data will be deleted</span>
                <form className="editProfileForm" onSubmit={handleClickDelete}>
                  <label className="editProfileFormItem" htmlFor="delUserId" style={{ color: "red" }} >
                    <p className="editProfileFormText" style={{ color: "red" }} >User ID:</p> <input className="editProfileInput" id="delUserId" ref={userIdDel} placeholder="userId" type="text" required disabled />
                  </label>
                  <button className="editProfileBtn" type="Submit" style={{ color: "red" }} disabled>DELETE</button>
                </form>
              </>
            }

            {/* Add admin role to user */}
            {/* //TODO: Add admin role to user */}
            <h3 className="editProfileTitle" style={{ color: "red" }} >Add admin role to user</h3>
            <span style={{ textAlign: "center" }}>The user will receive administrator rights</span>
            <form className="editProfileForm" id="editProfileFormIsAdmin" onSubmit={handleClickAddAdmin}>
              <label className="editProfileFormItem" htmlFor="isAdmin" style={{ color: "red" }} >
                <p className="editProfileFormText" style={{ color: "red" }} >User ID:</p>
                <button className="editProfileButtonGet" onClick={() => getEditUserIsAdmin(userIsAdmin)} >Get</button> <input className="editProfileInput" id="isAdmin" ref={userIsAdmin} placeholder="userId" type="text" />
              </label>
              <label className="editProfileFormItem" htmlFor="isAdminCheck" style={{ color: "red" }} >
                <p className="editProfileFormText" style={{ color: "red" }} >Add admin rights</p><input className="editProfileInput" id="isAdminCheck" ref={userIsAdminCheck} type="checkbox" defaultValue={isChecked ? "true" : "false"} checked={isChecked}
                  onChange={handleOnChange} />
              </label>
              {/* {isAdminUser._id !== undefined && isAdminUser.isAdmin === false ? 
              <label className="editProfileFormItem" htmlFor="isAdminYes" style={{ color: "red" }} >
                <p className="editProfileFormText" style={{ color: "red" }} >If you want add Admin rights:</p> 
                <input className="editProfileInput" id="isAdminYes" ref={userIsAdminYes} placeholder={`Enter please: ${isAdminUser?.personnelnumber}`} type="text" required />
              </label>
              :
              <></>} */}
              <button className="editProfileBtn" type="Submit" style={{ color: "red" }} >Add admin rights</button>
            </form>
          </div>
            : <div className="test" style={{ display: "none" }}>test</div>}
        </div>
      </div>
    </>
  )
}
