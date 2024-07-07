import "./postTlToLine2.css";
import { Edit, DoneOutline, EmojiEmotions } from "@mui/icons-material"
import Picker from "emoji-picker-react";
import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function PostTlToLine2() {
    const API = process.env.REACT_APP_SERVER_API
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [open, setOpen] = useState(false);
    const [openAnswer, setOpenAnswer] = useState(false);
    let [allTlToLines, setTlToLines] = useState([]);
    const [text, setText] = useState("");
    const date = new Date();
    const { user } = useContext(AuthContext)
    const desc = useRef();


    // emoji picker
    const handleEmoji = e => {
        setText((prev) => prev + e.emoji);
        setOpen(false);
    }

    const handleOpen = () => {
        setOpenAnswer(!openAnswer);
    }


    const handleAnswer = async (toLines) => {
        const newAnswer = {
            answer: text,
        }
        try {
            // console.log(newAnswer)
            await axios.put(`${API}/tlToLines/${toLines._id}`, newAnswer);
            document.getElementById("feedTlToLineInformationBtn").style.display = "none";
            setOpenAnswer(false);
        } catch (err) {
            console.log(err);
        }
    }


    function addZero(i) {
        if (i < 10) { i = "0" + i }
        return i;
    }

    let hh = addZero(date.getHours());
    let mm = addZero(date.getMinutes());
    let ss = addZero(date.getSeconds());

    //atention changed format of date to fr-CA not nl-NL
    let time = date.toLocaleDateString('fr-CA') + "T" + hh + ":" + mm + ":" + ss;


    useEffect(() => {
        let interval;
        const fetchData = async () => {
            try {
                const res = await axios.get(`${API}/tlToLines/allTlToLines`);
                setTlToLines(res.data);
                // console.log("test refresh")
            } catch (err) {
                console.error(err);
            }
        };

        let result = fetchData()

        if (!result) {
            interval = setInterval(fetchData, 10000);
        }

        interval = setInterval(fetchData, 10000); //set your time here. repeat every 5 seconds
        return () => clearInterval(interval);
    }, [API]);

       // delete tlToLine from database
       const toLineDeleteHandler = (toLines) => {
        try {
            axios.delete(`${API}/tlToLines/${toLines._id}`)
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <ul className="feedTlToLineList">
                {Object.values(allTlToLines).map((toLines) => {
                    return (
                        <li className="feedTlToLineInformation" key={toLines._id}>
                            {/* {toLines.line === user.personnelnumber && toLines.timer > time  ? */}
                            {toLines.line === user.personnelnumber ?
                                <div className="feedTlToLineInformationContent">
                                    <p className="feedTlToLineInformationHeader">Privat:</p>
                                    {/* <p className="feedTlToLineInformationTitle">{toLines.title}</p> */}
                                    <p className="feedTlToLineInformationDesc">{toLines.desc}</p>
                                    {toLines?.img && <img className="postMemoImg" src={PF + toLines?.img} alt='' />}
                                    {/* module for fast answer to line */}
                                    {(toLines?.reqRes && !toLines?.answer) && <button className="feedTlToLineInformationBtn tlToLineButton" id="feedTlToLineInformationBtn" onClick={() => handleOpen()} style={{ display: openAnswer ? "none" : "block" }}>Please answer</button>}
                                    {openAnswer && <>
                                        <div className="tlToLineInputContainer">
                                            <textarea style={{ height: "60px" }} className="tlToLineInput" placeholder={"Please answer me " + user.username || user.personnelnumber + "?"} ref={desc} value={text} defaultValue={"" || toLines?.answer} onChange={(e) => setText(e.target.value)} />
                                        </div>
                                        <div className="feedTlToLineInformationAnswerContainer">
                                            <div className="memoEmoji">
                                                <EmojiEmotions className="memoIcon" onClick={() => setOpen((prev) => !prev)} />
                                                <span className="memoOptionText" onClick={() => setOpen((prev) => !prev)}>{open ? "Hide" : "Show"} emojis</span>
                                            </div>
                                            <button className="tlToLineButton" onClick={() => handleAnswer(toLines)}>Send
                                                <DoneOutline />
                                            </button>
                                        </div>
                                    </>}
                                    <div className="memoEmojiPicker" style={{ display: openAnswer ? "block" : "none" }}>
                                        {open && (<Picker suggestedEmojisMode={["recent"]} style={{ width: "100%" }} reactionsDefaultOpen={true} searchDisabled={true} onEmojiClick={handleEmoji} />)}
                                    </div>
                                    <div className="feedTlToLineInformationEditContainer" style={{ display: (openAnswer || toLines?.answer) ? "flex" : "none" }}>
                                        {toLines?.answer &&
                                            <>
                                                <p className="feedTlToLineInformationAnswer">Answer: <span>{toLines?.answer}</span></p>
                                                <div className="editBtn">
                                                    <Edit onClick={() => setOpenAnswer(!openAnswer)} />
                                                </div>
                                            </>
                                        }
                                    </div>
                                    {/* <p className="feedTlToLineInformationDesc" style={{ fontSize: "10px" }}>The message is valid until {toLines?.timer} {time}</p> */}
                                    <p className="feedTlToLineInformationDesc" style={{ fontSize: "10px" }}>The message is valid until {toLines?.timer} {toLines?.timer < time && toLineDeleteHandler(toLines)}</p>
                                </div>
                                :
                                toLines.line === "forAll" ?
                                    <div className="feedTlToLineInformationContent">
                                        <p className="feedTlToLineInformationHeader">Group:</p>
                                        {/* <p className="feedTlToLineInformationTitle">{toLines.title}</p> */}
                                        <p className="feedTlToLineInformationDesc">{toLines.desc}</p>
                                        {toLines?.img && <img className="postMemoImg" src={PF + toLines?.img} alt='' />}
                                        {/* <p className="feedTlToLineInformationDesc" style={{ fontSize: "10px" }}>The message is valid until {toLines?.timer}</p> */}








                                        <p className="feedTlToLineInformationDesc" style={{ fontSize: "10px" }}>The message is valid until {toLines?.timer}{toLines?.timer < time && toLineDeleteHandler(toLines)}</p>
                                    </div>
                                    :
                                    <></>
                            }
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
