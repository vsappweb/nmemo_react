import { useContext, useEffect, useRef, useState } from "react";
import "./tlToLine.css";
import AvatarUser from "../avatarUser/AvatarUser";
import { AttachFile, DoneOutline, Cancel, EmojiEmotions } from "@mui/icons-material"
import { AuthContext } from "../../context/AuthContext";
import axios from "axios"
import Picker from "emoji-picker-react";


export default function TlToLine() {
    const API = process.env.REACT_APP_SERVER_API
    const [date] = useState(new Date());
    const desc = useRef();
    const forWho = useRef();
    const endTime = useRef();
    const reqRes = useRef();
    const [file, setFile] = useState(null);
    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);
    let [allUsers, setUsers] = useState([]);
    const { user } = useContext(AuthContext);
    const [isChecked, setIsChecked] = useState(false);

    const handleOnChange = () => {
        setIsChecked(!isChecked);
    };

    // create tlToLine in database
    const submitHandler = async (e) => {
        e.preventDefault()
        const newtlToLine = {
            userId: user._id,
            title: "ntlToLine " + date.toLocaleDateString('nl-NL'),
            desc: desc.current.value,
            line: forWho.current.value,
            timer: new Date(endTime.current.value).toLocaleDateString('nl-NL')+' '+new Date(endTime.current.value).toLocaleTimeString('nl-NL'),
            reqRes: reqRes.current.value
        };
        if (file) {
            const data = new FormData();
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            const fileName = uniqueSuffix + file.name;
            console.log(fileName)
            data.append("name", fileName);
            data.append("file", file);
            newtlToLine.img = fileName;
            try {
                await axios.post(`${API}/upload`, data);
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        }


        try {
            await axios.post(`${API}/tlToLines`, newtlToLine);
            window.location.reload();
        } catch (err) {

        }
    }

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
        getUsers()
    }, [API]);



    // emoji picker
    const handleEmoji = e => {
        setText((prev) => prev + e.emoji);
        setOpen(false);
    }

    // sort users by role (operators and wals)
    const roles = (a, b) => {
        return (b.role) - (a.role);
    }

    allUsers = Object.values(allUsers).sort(roles);

    // filter users by role (operators and wals)
    allUsers = Object.values(allUsers).filter((user) => {
        return user.role === 1 || user.role === 3;
    });


    return (
        <div className="tlToLine">
            <div className="tlToLineWrapper">
                <div className="tlToLinechooseBoxCapton">
                    <h1 className="tlToLineTitle">Send information to</h1>
                    <label htmlFor="tlToLinechooseBox">
                        <select className="input" name="tlToLinechooseBox" ref={forWho} >
                            <option value="forAll">ALL</option>
                            {Object.values(allUsers).map((userReciver) => {
                                return (
                                    <option className="allUsersWrapper" value={userReciver.personnelnumber} style={{ marginBottom: "15px" }} key={userReciver._id}>
                                        {userReciver.username || userReciver.personnelnumber}
                                    </option>
                                )
                            })}
                        </select>
                    </label>
                    <label htmlFor="tlToLineReqRes" className="tlToLineReqRes">
                        <p className="tlToLineRequestResponse">Response <br /> request</p>
                        <input type="checkbox" id="tlToLineReqRes" name="reqRes" ref={reqRes} defaultValue={isChecked ? "true" : "false"} checked={isChecked} onChange={handleOnChange} />
                    </label>
                </div>
                <div className="tlToLineTop">
                    <div className="tlToLineTopMiniSidebar">
                        <div className="avatarUser">
                            <AvatarUser user={user} />
                        </div>
                    </div>
                    <div className="tlToLineInputContainer">
                        <textarea className="tlToLineInput" placeholder={"Please leave information " + user.username || user.personnelnumber + "?"} ref={desc} value={text} onChange={(e) => setText(e.target.value)} />
                    </div>
                </div>
                <hr className="tlToLineHr" />
                {file && (
                    <div className="tlToLineImgContainer">
                        <img className="tlToLineImg" src={URL.createObjectURL(file)} alt="tlToLineImg" />
                        <Cancel className="tlToLineCancel" onClick={() => setFile(null)} />
                    </div>
                )}
                <form className="tlToLineBottom" onSubmit={submitHandler}>
                    <div className="tlToLineOptions">
                        <label htmlFor="filetlToLine" className="tlToLineOption">
                            <AttachFile className="tlToLineIcon" />
                            <span className="tlToLineOptionText">Add file</span>
                            <input style={{ display: "none" }} type="file" id="filetlToLine" accept=".png, .jpeg, .jpg" onChange={(e) => setFile(e.target.files[0])} />
                        </label>
                        <div className="memoOption">
                            <div className="memoEmoji">
                                <EmojiEmotions className="memoIcon" onClick={() => setOpen((prev) => !prev)} />
                                <span className="memoOptionText" onClick={() => setOpen((prev) => !prev)}>{open ? "Hide" : "Show"} emojis</span>
                            </div>
                        </div>
                        <label className="tlToLineOption" htmlFor="tlToLineTimer">
                            <span className="tlToLineOptionText">End time </span>
                            <input type="datetime-local" ref={endTime} id="tlToLineTimer" />
                        </label>
                    </div>
                    <button className="tlToLineButton" type="submit">Send
                        <DoneOutline />
                    </button>
                </form>
                <div className="memoEmojiPicker">
                    {open && (<Picker suggestedEmojisMode={["recent"]} style={{ width: "100%" }} reactionsDefaultOpen={true} searchDisabled={true} onEmojiClick={handleEmoji} />)}
                </div>
            </div>
        </div >
    )
}
