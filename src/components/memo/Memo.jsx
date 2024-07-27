import { useContext, useEffect, useRef, useState } from "react";
import "./memo.css";
import AvatarUser from "../avatarUser/AvatarUser";
import {
  PermMedia,
  Try,
  DoneOutline,
  EmojiEmotions,
  Cancel,
  Today,
  WorkOutline,
  Edit,
  HighlightOff,
  CleaningServices,
} from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Picker from "emoji-picker-react";

export default function Memo({ edit }) {
  const API = process.env.REACT_APP_SERVER_API;
  let [allPreparedTexts, setPreparedTexts] = useState([]);
  const [getPreparedText, setGetPreparedText] = useState({});
  const [date] = useState(new Date());
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const title = useRef();
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [openPreparedTexts, setOpenPreparedTexts] = useState(false);
  const [text, setText] = useState("");
  const [editMemo, setEditMemo] = useState({});
  let hidePan = true;

  edit = Object.values(edit).filter((edit) => edit.userId === user._id);
  edit = edit[0];

  if (edit === undefined) {
    hidePan = false;
  }

  const editMemoGetHandler = (edit) => {
    setEditMemo(edit);
    setText((prev) => prev + edit?.desc + " ");
  };

  // get all PreparedTexts from database
  useEffect(() => {
    const getPreparedTexts = async () => {
      try {
        const res = await axios.get(`${API}/preparedTexts/allPreparedTexts`);
        setPreparedTexts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPreparedTexts();
  }, [API]);

  // emoji picker
  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  // date picker
  const handleDate = (e) => {
    setText((prev) => prev + " " + date.toLocaleDateString("nl-NL") + " ");
  };

  // order
  const handleOrder = (e) => {
    const product = localStorage.getItem("product");
    const noProduct = " you have no product :( ";
    setText(
      (prev) =>
        prev +
        " " +
        (product ? JSON.parse(localStorage.getItem("product")) : noProduct) +
        " "
    );
  };

  // preparedTexts text input
  const handlePreparedTextsText = (preparedText) => {
    setText((prev) => prev + " " + preparedText.title + " ");
  };

  // open preparedTexts
  const handlePreparedTexts = () => {
    setOpenPreparedTexts(!openPreparedTexts);
  };

  // get preparedText
  const handlePreparedTextGet = (preparedText) => {
    setGetPreparedText(preparedText);
  };

  // delete preparedText
  const handlePreparedTextDelete = (preparedText) => {
    try {
      axios.delete(`${API}/preparedTexts/${preparedText._id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // create memo in database
  const submitHandler = async (e) => {
    e.preventDefault();
    const newMemo = {
      userId: user._id,
      product: JSON.parse(localStorage.getItem("product"))
        ? JSON.parse(localStorage.getItem("product"))
        : "",
      title: "nMemo " + date.toLocaleDateString("nl-NL"),
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileName = uniqueSuffix + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newMemo.img = fileName;
      try {
        await axios.post(`${API}/upload`, data);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.post(`${API}/memos`, newMemo);
      window.location.reload();
    } catch (err) {}
  };

  // edit memo in database
  const editSubmitHandler = async (e) => {
    e.preventDefault();
    const newMemo = {
      userId: user._id,
      product: JSON.parse(localStorage.getItem("product"))
        ? JSON.parse(localStorage.getItem("product"))
        : "",
      title: "nMemo " + date.toLocaleDateString("nl-NL"),
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileName = uniqueSuffix + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newMemo.img = fileName;
      try {
        await axios.post(`${API}/upload`, data);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.put(`${API}/memos/${editMemo._id}`, newMemo);
      window.location.reload();
    } catch (err) {}
  };

  // clear edit memo
  const eventCleanHandler = () => {
    setEditMemo({});
    setText("");
  };

  // create prepared text in database
  const handleClickCreate = async (e) => {
    e.preventDefault();
    const preparedText = {
      title: title.current.value,
    };
    try {
      await axios.post(`${API}/preparedTexts`, preparedText);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // edit prepared text by id from database
  const handleClickEdit = async (e) => {
    e.preventDefault();
    const preparedText = {
      title: title.current.value,
    };
    try {
      await axios.put(
        `${API}/preparedTexts/${getPreparedText._id}`,
        preparedText
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="memo">
      <div className="memoWrapper">
        <h1 className="memoTitle">
          Memo {user.username || user.personnelnumber}
        </h1>
        <div className="memoTop">
          <div className="memoTopMiniSidebar">
            <div className="avatarUser">
              <AvatarUser user={user} />
            </div>
            <Today
              className="memoIcon"
              htmlColor="tomato"
              onClick={handleDate}
            />
            <WorkOutline
              className="memoIcon"
              htmlColor="tomato"
              onClick={handleOrder}
            />
          </div>
          <div className="memoInputContainer">
            <textarea
              className="memoInput"
              placeholder={
                "Please leave information " + user.username ||
                user.personnelnumber + "?"
              }
              ref={desc}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            {openPreparedTexts ? (
              <div className="memoChoisePreparedText memoChoisePreparedTextScrollbar">
                <button
                  className="memoChoisePreparedTextCloseBtn"
                  onClick={() => setOpenPreparedTexts(false)}
                >
                  Close
                </button>
                {Object.values(allPreparedTexts).map((preparedText) => {
                  return (
                    <div
                      className="memoChoisePreparedTextItem"
                      key={preparedText._id}
                    >
                      <div className="memoChoisePreparedTextItemContent">
                        <p
                          className="memoChoisePreparedTextItemTitle"
                          onClick={() => handlePreparedTextsText(preparedText)}
                        >
                          {preparedText.title}
                        </p>
                      </div>
                      {user.role === 0 || user.isAdmin ? (
                        <div className="memoChoisePreparedTextItemDo">
                          <div className="editBtn">
                            <Edit
                              className="preparedTextEdit"
                              onClick={() =>
                                handlePreparedTextGet(preparedText)
                              }
                            />
                          </div>
                          <div className="deleteBtn">
                            <HighlightOff
                              className="preparedTextDelete"
                              onClick={() =>
                                handlePreparedTextDelete(preparedText)
                              }
                            />
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                })}
                {user.role === 0 || user.isAdmin ? (
                  <form
                    className="preparedTextForm"
                    onSubmit={
                      getPreparedText._id === undefined
                        ? handleClickCreate
                        : handleClickEdit
                    }
                  >
                    {getPreparedText._id === undefined ? (
                      ""
                    ) : (
                      <CleaningServices
                        className="preparedTextFormBtn"
                        onClick={() => setGetPreparedText({})}
                      />
                    )}
                    <label className="preparedTextFormItem" htmlFor="title">
                      <input
                        className="preparedTextFormInput"
                        type="text"
                        placeholder="New text"
                        id="title"
                        ref={title}
                        defaultValue={"" || getPreparedText.title}
                        required
                      />
                    </label>
                    <button className="preparedTextFormBtn" type="submin">
                      {getPreparedText._id === undefined ? "Create" : "Edit"}
                    </button>
                  </form>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <hr className="memoHr" />
        {file && (
          <div className="memoImgContainer">
            <img
              className="memoImg"
              src={URL.createObjectURL(file)}
              alt="memoImg"
            />
            <Cancel className="memoCancel" onClick={() => setFile(null)} />
          </div>
        )}
        <form
          className="memoBottom"
          onSubmit={
            editMemo._id === undefined ? submitHandler : editSubmitHandler
          }
        >
          <div className="memoOptions">
            <label htmlFor="fileMemo" className="memoOption">
              <PermMedia className="memoIcon" />
              <span className="memoOptionText">Photo</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="fileMemo"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <label htmlFor="" className="memoOption">
              <Try
                className="memoIcon"
                htmlColor="tomato"
                onClick={handlePreparedTexts}
              />
              <span className="memoOptionText" onClick={handlePreparedTexts}>
                {openPreparedTexts ? "Hide" : "Show"} texts
              </span>
            </label>
            <div className="memoOption">
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
            </div>
          </div>
          <button className="memoButton" type="submit">
            {editMemo._id === undefined ? "Leave Memo" : "Edit Memo"}
            {editMemo._id === undefined ? <DoneOutline /> : <Edit />}
          </button>
          {editMemo._id === undefined ? (
            <>
              {hidePan && (
                <div
                  className="editBtn"
                  onClick={() => editMemoGetHandler(edit)}
                >
                  <Edit />
                </div>
              )}
            </>
          ) : (
            <CleaningServices
              className="editEventsBtnClean"
              onClick={eventCleanHandler}
            />
          )}
        </form>
        <div className="memoEmojiPicker">
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
      </div>
    </div>
  );
}
