import { useRef, useState } from "react";
import "./gmToolsForm.css";
// import AvatarUser from "../avatarUser/AvatarUser";
import { DoneOutline } from "@mui/icons-material";
// import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function GmToolsForm() {
  const API = process.env.REACT_APP_SERVER_API;
  const [date] = useState(new Date());
  const toolNumber = useRef();
  const problem = useRef();
  const howFix = useRef();
  const sortProblems = useRef();
  // let [allGmTool, setAllGmTool] = useState([]);
  // const { user } = useContext(AuthContext);

  // create gmToolsForm in database

  const submitHandler = async (e) => {
    e.preventDefault();
    const toolInfo = {
      toolNumber: toolNumber.current.value,
      problems: sortProblems.current.value,
      problem: problem.current.value,
      howFixed: howFix.current.value,
      date: date.toLocaleDateString("nl-NL"),
    };
    try {
      console.log(toolInfo);
      await axios.post(`${API}/gmTools`, toolInfo);
      window.location.reload();
    } catch (err) {}
  };

  // // get all users from database
  // useEffect(() => {
  //     const getGmTools = async () => {
  //         try {
  //             const res = await axios.get(`${API}/gmTools/allGmTools`);
  //             setAllGmTool(res.data);
  //         } catch (err) {
  //             console.log(err);
  //         }
  //     };
  //     getGmTools()
  // }, [API]);

  // // sort users by role (operators and wals)
  // const roles = (a, b) => {
  //     return (b.role) - (a.role);
  // }

  // allUsers = Object.values(allUsers).sort(roles);

  // // filter users by role (operators and wals)
  // allUsers = Object.values(allUsers).filter((user) => {
  //     return user.role === 3;
  // });

  return (
    <div className="gmToolsForm">
      <div className="gmToolsFormWrapper">
        <div className="gmToolsFormchooseBoxCapton">
          <h1 className="gmToolsFormTitle">Tools and problems</h1>
        </div>
        <div className="gmToolsFormInner">
          <form
            className="gmToolsFormForm"
            autoComplete="off"
            onSubmit={submitHandler}
          >
            <div className="gmToolsFormOptionsWrapper">
              <label htmlFor="gmToolsForm" className="gmToolsFormOption">
                <h4 className="gmToolsFormItemTitle">
                  {" "}
                  Datum: {date.toLocaleDateString("nl-NL")}
                </h4>
              </label>
              <div className="gmToolFormBox">
                <label htmlFor="gmToolsForm" className="gmToolsFormOption">
                  <h4
                    className="gmToolsFormItemTitle"
                    style={{ color: "blue" }}
                  >
                    {" "}
                    Tool number:{" "}
                  </h4>
                  <input
                    id="gmToolsForm"
                    type="text"
                    placeholder="00-000-a-z"
                    className="gmToolsFormInput"
                    ref={toolNumber}
                  />
                </label>
                <label className=" bmGmSortLabel" htmlFor="productProblems">
                  <h4 className="gmToolsFormItemTitle">Problems: </h4>
                  <select
                    className="editProfileInput"
                    id="productProblems"
                    ref={sortProblems}
                    defaultValue={""}
                    required
                  >
                    <option value="">What type of problem?</option>
                    <option value="krassen">krassen</option>
                    <option value="braamuorming">braamuorming</option>
                    <option value="schilvers">schilvers</option>
                    <option value="clenk in het cleel">
                      clenk in het cleel
                    </option>
                  </select>
                </label>
              </div>

              <label
                htmlFor="gmToolsForm"
                className="gmToolsFormOption photoAnchor"
              >
                <h4
                  className="gmToolsFormItemTitle"
                  style={{ color: "orangeRed" }}
                >
                  Problem:
                </h4>
                <textarea
                  className="gmToolsFormTextarea"
                  ref={problem}
                  required
                />
              </label>

              <label htmlFor="gmToolsForm" className="gmToolsFormOption">
                <h4 className="gmToolsFormItemTitle" style={{ color: "green" }}>
                  How we fix it:
                </h4>
                <textarea
                  className="gmToolsFormTextarea"
                  ref={howFix}
                  required
                />
              </label>

              <hr className="gmToolsFormHr" />
            </div>
            <button className="gmToolsFormButton" type="submit">
              Save
              <DoneOutline />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
