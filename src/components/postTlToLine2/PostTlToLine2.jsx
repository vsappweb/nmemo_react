import "./postTlToLine2.css";
import {
  Edit,
  DoneOutline,
  EmojiEmotions,
  DoneAll,
  RemoveDone,
  ArrowBack,
  ArrowForward,
} from "@mui/icons-material";
import Picker from "emoji-picker-react";
import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function PostTlToLine2({
  toLines,
  allTlToLines,
  setTlToLines,
  openAnswer,
  setOpenAnswer,
}) {
  const API = process.env.REACT_APP_SERVER_API;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [open, setOpen] = useState(false);
  // const [openAnswer, setOpenAnswer] = useState(false);
  const [text, setText] = useState("");
  // let [allTlToLines, setTlToLines] = useState([]);
  const date = new Date();
  const { user } = useContext(AuthContext);
  const desc = useRef();

  // emoji picker
  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleOpen = () => {
    setOpenAnswer(!openAnswer);
    document.getElementById("feedTlToLineInformationBtn").style.display =
      "none";
    document.getElementById("feedTlToLineInformationBtn").style.visibility =
      "hidden";
  };

  const handleAnswer = async (toLines) => {
    const newAnswer = {
      answer: text,
    };
    try {
      await axios.put(`${API}/tlToLines/${toLines._id}`, newAnswer);
      setOpenAnswer(!openAnswer);
    } catch (err) {
      console.log(err);
    }
  };

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  let hh = addZero(date.getHours());
  let mm = addZero(date.getMinutes());
  let ss = addZero(date.getSeconds());

  //atention changed format of date to fr-CA not nl-NL
  let time = date.toLocaleDateString("nl-NL") + " " + hh + ":" + mm + ":" + ss;

  // delete tlToLine from database
  const toLineDeleteHandler = (toLines) => {
    try {
      axios.delete(`${API}/tlToLines/${toLines._id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const [agree, setAgree] = useState(toLines.agrees.length);
  const [disagree, setDisagree] = useState(toLines.disagrees.length);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isDisagreed, setIsDisagreed] = useState(false);
  // const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsAgreed(toLines.agrees.includes(currentUser._id));
  }, [currentUser._id, toLines.agrees]);

  useEffect(() => {
    setIsDisagreed(toLines.disagrees.includes(currentUser._id));
  }, [currentUser._id, toLines.disagrees]);

  const agreeHandler = (toLines) => {
    try {
      axios.put(`${API}/tlToLines/` + toLines._id + "/agree", {
        userId: currentUser._id,
      });
    } catch (err) {}
    setAgree(isAgreed ? agree - 1 : agree + 1);
    setIsAgreed(!isAgreed);
  };

  const disagreeHandler = (toLines) => {
    try {
      axios.put(`${API}/tlToLines/` + toLines._id + "/disagree", {
        userId: currentUser._id,
      });
    } catch (err) {}
    setDisagree(isDisagreed ? disagree - 1 : disagree + 1);
    setIsDisagreed(!isDisagreed);
  };

  return (
    <>
      {toLines.line === user.personnelnumber ? (
        <div className="feedTlToLineInformationContent">
          <p className="feedTlToLineInformationHeader">Privat:</p>
          <p className="feedTlToLineInformationDesc">{toLines.desc}</p>
          {toLines?.img && (
            <img className="postMemoImg" src={PF + toLines?.img} alt="" />
          )}
          {/* module for fast answer to line */}
          {toLines?.reqRes && !toLines?.answer && (
            <button
              className="feedTlToLineInformationBtn tlToLineButton"
              id="feedTlToLineInformationBtn"
              onClick={() => handleOpen()}
              style={{ display: openAnswer ? "none" : "block" }}
            >
              Please answer
            </button>
          )}
          {openAnswer && (
            <>
              <div className="tlToLineInputContainer">
                <textarea
                  style={{ height: "60px" }}
                  className="tlToLineInput"
                  placeholder={
                    "Please answer me " + user.username ||
                    user.personnelnumber + "?"
                  }
                  ref={desc}
                  value={text}
                  defaultValue={"" || toLines?.answer}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <div className="feedTlToLineInformationAnswerContainer">
                <div className="memoEmoji">
                  <EmojiEmotions
                    className="memoIcon"
                    onClick={() => setOpen((prev) => !prev)}
                  />
                  <span
                    className="memoOptionText"
                    onClick={() => setOpen((prev) => !prev)}
                  >
                    {open ? "Hide" : "Show"} emojis
                  </span>
                </div>
                <button
                  className="tlToLineButton"
                  onClick={() => handleAnswer(toLines)}
                >
                  Send
                  <DoneOutline />
                </button>
              </div>
            </>
          )}
          <div
            className="memoEmojiPicker"
            style={{ display: openAnswer ? "block" : "none" }}
          >
            {open && (
              <Picker
                suggestedEmojisMode={["recent"]}
                style={{ width: "100%" }}
                reactionsDefaultOpen={true}
                searchDisabled={true}
                onEmojiClick={handleEmoji}
              />
            )}
          </div>
          <div
            className="feedTlToLineInformationEditContainer"
            style={{ display: openAnswer || toLines?.answer ? "flex" : "none" }}
          >
            {toLines?.answer && (
              <>
                <p className="feedTlToLineInformationAnswer">
                  Answer: <span>{toLines?.answer}</span>
                </p>
                <div className="editBtn">
                  <Edit onClick={() => setOpenAnswer(!openAnswer)} />
                </div>
              </>
            )}
          </div>
          <p
            className="feedTlToLineInformationDesc"
            style={{ fontSize: "10px" }}
          >
            The message is valid until {toLines?.timer}{" "}
            {toLines?.timer < time && toLineDeleteHandler(toLines)}
          </p>
        </div>
      ) : toLines.line === "forAll" && user.role !== 2 ? (
        <div className="feedTlToLineInformationContent">
          <p className="feedTlToLineInformationHeader">Group:</p>
          <p className="feedTlToLineInformationDesc">{toLines.desc}</p>
          {toLines?.img && (
            <img className="postMemoImg" src={PF + toLines?.img} alt="" />
          )}

          {toLines?.reqRes && (
            <div className="feedTlToLineInformationBtnBox">
              <div
                className="feedTlToLineInformationMarkBox"
                style={{ visibility: disagree < 1 ? "visible" : "hidden" }}
                onClick={() => agreeHandler(toLines)}
              >
                <DoneAll
                  id="feedTlToLineInformationBtnDone"
                  style={{ color: isAgreed ? "green" : "grey" }}
                />
                <p
                  className="feedTlToLineInformationMark"
                  style={{ color: isAgreed ? "green" : "grey" }}
                >
                  {toLines.agrees.length > 0 && ` ${toLines.agrees.length}`}{" "}
                  okey
                </p>
                <ArrowBack />
              </div>
              <div className="feedTlToLineInfoReqRes">
                <p>Your answer please</p>
              </div>
              <div
                className="feedTlToLineInformationMarkBox"
                style={{ visibility: agree < 1 ? "visible" : "hidden" }}
                onClick={() => disagreeHandler(toLines)}
              >
                <ArrowForward />
                <p
                  className="feedTlToLineInformationMark"
                  style={{ color: isDisagreed ? "red" : "grey" }}
                >
                  not okey
                  {toLines.disagrees.length > 0 &&
                    ` ${toLines.disagrees.length}`}
                </p>
                <RemoveDone
                  id="feedTlToLineInformationBtnNotDone"
                  style={{ color: isDisagreed ? "red" : "grey" }}
                />
              </div>
            </div>
          )}
          <p
            className="feedTlToLineInformationDesc"
            style={{ fontSize: "10px" }}
          >
            The message is valid until {toLines?.timer}
            {toLines?.timer < time && toLineDeleteHandler(toLines)}
          </p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
