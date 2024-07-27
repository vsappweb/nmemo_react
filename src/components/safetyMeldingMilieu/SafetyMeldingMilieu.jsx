import { useContext, useEffect, useRef, useState } from "react";
import "./safetyMeldingMilieu.css";
import AvatarUser from "../avatarUser/AvatarUser";
import { AttachFile, DoneOutline, Cancel } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function SafetyMeldingMilieu() {
  const PHONE = process.env.REACT_APP_PHONE;
  const API = process.env.REACT_APP_SERVER_API;
  const [date] = useState(new Date());
  const situatie = useRef();
  const maatregel = useRef();
  const oplossing = useRef();
  const desc = useRef();

  const forWho = useRef();
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  let [allUsers, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  // window.setTimeout(function () {
  //     window.location.reload();
  // }, 30000);

  // create safetyMeldingMilieu in database
  const submitHandler = async (e) => {
    e.preventDefault();
    // if (forWho.current.value === "empty") {
    //     desc.current.setCustomValidity("What line do you want to send it to?");
    //     console.log("empty")
    // } else {
    //     const newsafetyMeldingMilieu = {
    //         userId: user._id,
    //         line: forWho.current.value,
    //         title: "MemoToLine " + date.toLocaleDateString('nl-NL'),
    //         desc: desc.current.value,
    //     };
    //     if (file) {
    //         const data = new FormData();
    //         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //         const fileName = uniqueSuffix + file.name;
    //         console.log(fileName)
    //         data.append("name", fileName);
    //         data.append("file", file);
    //         newsafetyMeldingMilieu.img = fileName;
    //         try {
    //             await axios.post(`${API}/upload`, data);
    //             window.location.reload();
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }

    //     try {
    //         await axios.post(`${API}/memos`, newsafetyMeldingMilieu);
    //         window.location.reload();
    //     } catch (err) {

    //     }
    // }
  };

  // get all users from database
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

  // sort users by role (operators and wals)
  const roles = (a, b) => {
    return b.role - a.role;
  };

  allUsers = Object.values(allUsers).sort(roles);

  // filter users by role (operators and wals)
  allUsers = Object.values(allUsers).filter((user) => {
    return user.role === 3;
  });

  return (
    <div className="safetyMeldingMilieu">
      <div className="safetyMeldingMilieuWrapper">
        <div className="safetyMeldingMilieuchooseBoxCapton">
          <h1 className="safetyMeldingMilieuTitle">Melding Milieu</h1>
        </div>
        <div className="safetyMeldingMilieuInner">
          <div className="safetyMeldingMilieuTopMiniSidebar">
            <div className="avatarUser">
              <AvatarUser user={user} />
            </div>
          </div>
          <form className="safetyMeldingMilieuForm" onSubmit={submitHandler}>
            <div className="safetyMeldingMilieuOptionsWrapper">
              <label
                htmlFor="safetyMeldingMilieu"
                className="safetyMeldingMilieuOption"
              >
                <h4 className="safetyMeldingMilieuItemTitle"> Naam: </h4>
                <input
                  id="safetyMeldingMilieu"
                  type="text"
                  placeholder="Naam"
                  className="safetyMeldingMilieuInput"
                  ref={forWho}
                />
              </label>
              <label
                htmlFor="safetyMeldingMilieu"
                className="safetyMeldingMilieuOption"
              >
                <h4 className="safetyMeldingMilieuItemTitle">
                  {" "}
                  Datum: {date.toLocaleDateString("nl-NL")}
                </h4>
              </label>
              <label
                htmlFor="safetyMeldingMilieuchooseBox"
                className="safetyMeldingMilieuOption"
              >
                <h4 className="safetyMeldingMilieuItemTitle">
                  Locatie (wals):
                </h4>
                <select
                  className="input safetyMeldingMilieuInput"
                  name="safetyMeldingMilieuchooseBox"
                  ref={forWho}
                >
                  <option value="empty">What line?</option>
                  {Object.values(allUsers).map((userReciver) => {
                    return (
                      <option
                        className="allUsersWrapper"
                        value={userReciver.personnelnumber}
                        style={{ marginBottom: "15px" }}
                        key={userReciver._id}
                      >
                        {userReciver.username || userReciver.personnelnumber}
                      </option>
                    );
                  })}
                </select>
              </label>

              <label
                htmlFor="safetyMeldingMilieu"
                className="safetyMeldingMilieuOption photoAnchor"
              >
                <h4 className="safetyMeldingMilieuItemTitle">
                  Beschrijf de situatie
                </h4>
                <label
                  htmlFor="filesafetyMeldingMilieu"
                  className="safetyMeldingMilieuPhoto"
                >
                  <AttachFile className="safetyMeldingMilieuIcon" />
                  <span className="safetyMeldingMilieuOptionText safetyMeldingMilieuIcon">
                    Add photo
                  </span>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="filesafetyMeldingMilieu"
                    accept=".png, .jpeg, .jpg"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </label>
                <textarea
                  className="safetyMeldingMilieuTextarea"
                  placeholder={
                    "Maak een foto als dat kan of vraag je teamleider om enn foto te maken - stuur deze naar Nelleke"
                  }
                  ref={situatie}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </label>

              <label
                htmlFor="safetyMeldingMilieu"
                className="safetyMeldingMilieuOption"
              >
                <h4 className="safetyMeldingMilieuItemTitle">
                  Direct genomen maatregel:
                </h4>
                <textarea
                  className="safetyMeldingMilieuTextarea"
                  placeholder={"Direct genomen maatregel:"}
                  ref={maatregel}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </label>

              <label
                htmlFor="safetyMeldingMilieu"
                className="safetyMeldingMilieuOption"
              >
                <h4 className="safetyMeldingMilieuItemTitle">
                  Wat is jouw idee voor een oplossing?
                </h4>
                <textarea
                  className="safetyMeldingMilieuTextarea"
                  placeholder={"Wat is jouw idee voor een oplossing?"}
                  ref={oplossing}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </label>
              <label
                htmlFor="safetyMeldingMilieu"
                className="safetyMeldingMilieuOption"
              >
                <h4 className="safetyMeldingMilieuItemTitle">
                  Wat is de oorzaak van dit milieu incident?
                </h4>
                <div className="safetyMeldingMilieuRadio">
                  <input
                    type="radio"
                    name="safetyMeldingMilieuchooseBox"
                    id=""
                  />
                  Slijage
                </div>
                <div className="safetyMeldingMilieuRadio">
                  <input
                    type="radio"
                    name="safetyMeldingMilieuchooseBox"
                    id=""
                  />
                  Achterstallig onderhoud
                </div>
                <div className="safetyMeldingMilieuRadio">
                  <input
                    type="radio"
                    name="safetyMeldingMilieuchooseBox"
                    id=""
                  />
                  Ongeluk
                </div>
                <div className="safetyMeldingMilieuRadio">
                  <input
                    type="radio"
                    name="safetyMeldingMilieuchooseBox"
                    id=""
                  />
                  Onvoldoende instructie
                </div>
                <div className="safetyMeldingMilieuRadio">
                  <input
                    type="radio"
                    name="safetyMeldingMilieuchooseBox"
                    id=""
                  />
                  Instructie niet opgevolgd
                </div>
                <div className="safetyMeldingMilieuRadio">
                  <input
                    type="radio"
                    name="safetyMeldingMilieuchooseBox"
                    id=""
                  />
                  Anders, namelijk:
                </div>
              </label>

              <hr className="safetyMeldingMilieuHr" />
              {file && (
                <div className="safetyMeldingMilieuImgContainer">
                  <img
                    className="safetyMeldingMilieuImg"
                    src={URL.createObjectURL(file)}
                    alt="safetyMeldingMilieuImg"
                  />
                  <Cancel
                    className="safetyMeldingMilieuCancel"
                    onClick={() => setFile(null)}
                  />
                </div>
              )}

              <label
                htmlFor="safetyMeldingMilieu"
                className="safetyMeldingMilieuOption"
              >
                <h4 className="safetyMeldingMilieuItemTitle">
                  Whatsapp Nelleke
                </h4>
                <input
                  className="safetyMeldingMilieuInput"
                  type="tel"
                  id="safetyMeldingMilieuphone"
                  name="safetyMeldingMilieuphone"
                  placeholder="Phone"
                  value={PHONE}
                />
              </label>
            </div>
            <button className="safetyMeldingMilieuButton" type="submit">
              Report
              <DoneOutline />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
