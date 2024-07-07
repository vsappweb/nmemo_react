import { useContext, useEffect, useRef, useState } from "react";
import { renderToString } from 'react-dom/server'
import Post from "../post/Post";
import PostMemo from "../postMemo/PostMemo";
// import PostShiftTransfer from "../postShiftTransfer/PostShiftTransfer";
import Share from "../share/Share";
// import Memo from "../memo/Memo";
// import ShiftTransfer from "../shiftTransfer/ShiftTransfer";
// import MemoToLine from "../memoToLine/MemoToLine";
import PostTlToLine2 from "../postTlToLine2/PostTlToLine2";
import ShiftTransfer2 from "../shiftTransfer2/ShiftTransfer2";
import "./feed.css";
import axios from "axios"
import { AuthContext } from "../../context/AuthContext";
import DateTimeShift from "../dateTimeShift/DateTimeShift";
import { Edit, DoneOutline, EmojiEmotions } from "@mui/icons-material"
import Picker from "emoji-picker-react";
import CircularProgress from "@mui/material/CircularProgress";

export default function Feed({ personnelnumber, shiftTransfer }) {
    const API = process.env.REACT_APP_SERVER_API
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const desc = useRef();
    let date = new Date();
    const [posts, setPosts] = useState([]);
    // const [postTlToLines, setPostTlToLines] = useState([]);
    const [postsMemo, setPostsMemo] = useState([]);
    let [postsShiftTransfer, setPostsShiftTransfer] = useState([]);
    const { user } = useContext(AuthContext)
    // let [allEvents, setEvents] = useState([]);
    let [allTlToLines, setTlToLines] = useState([]);
    let [allMemoToLines, setMemoToLines] = useState([]);
    const [hideShiftTransferForm, setHideShiftTransferForm] = useState(true);
    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);
    const [openAnswer, setOpenAnswer] = useState(false);


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


    // get all events from database 
    const shiftNow = renderToString(<DateTimeShift />);



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

    // get all tlToLines from database
    useEffect(() => {
        let interval;
        const fetchData = async () => {
            try {
                const res = await axios.get(`${API}/memos/allMemos`);
                setMemoToLines(res.data);
                // console.log("test refresh")
                // console.log(res.data);
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

    useEffect(() => {
        const fetchPostsShiftTransfer = async () => {
            const res = await axios.get(`${API}/shiftTransfers/profile/` + user.personnelnumber)
            setPostsShiftTransfer(res.data.sort((st1, st2) => {
                return new Date(st2.createdAt) - new Date(st1.createdAt);
            }));
        };
        fetchPostsShiftTransfer();
    }, [user.personnelnumber, API])


     useEffect(() => {
        const fetchPostsMemo = async () => {
            const res = personnelnumber
                ? await axios.get(`${API}/memos/profile/` + personnelnumber)
                : await axios.get(`${API}/memos/timeline/` + user._id);
            setPostsMemo(res.data.sort((m1, m2) => {
                return new Date(m2.createdAt) - new Date(m1.createdAt);
            }));
        };
        fetchPostsMemo();
    }, [personnelnumber, user._id, API])


    useEffect(() => {
        const fetchPosts = async () => {
            const res = personnelnumber
                ? await axios.get(`${API}/posts/profile/` + personnelnumber)
                : await axios.get(`${API}/posts/timeline/` + user._id);
            setPosts(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }));
        };
        fetchPosts();
    }, [personnelnumber, user._id, API])


    // sort users by line
    const shiftNowIs = (a, b) => {
        return (a.createdAt) - (b.createdAt);
    }

    postsShiftTransfer = Object.values(postsShiftTransfer).sort(shiftNowIs);

    // filter for current user
    postsShiftTransfer = Object.values(postsShiftTransfer).slice(0, 1).filter((shtni) => {
        // console.log("test filter", shtni.line, shtni.date, shtni.shift);
        return shtni.line === user.username;
    });

    useEffect(() => {
        let interval;
        const whatShift = async () => {
            try {
                // console.log(hideShiftTransferForm);
                if (postsShiftTransfer) {
                    Object.values(postsShiftTransfer).forEach((postsShiftTransfer) => {
                        if (postsShiftTransfer.shift === shiftNow && postsShiftTransfer.date === date.toLocaleDateString('nl-NL')) {
                            // console.log("hide shift transfer form");
                            setHideShiftTransferForm(false);
                        } else if (postsShiftTransfer.shift !== shiftNow && postsShiftTransfer.date === date.toLocaleDateString('nl-NL')) {
                            // console.log("show shift transfer form",postsShiftTransfer.shift, shiftNow, postsShiftTransfer.date, date.toLocaleDateString('nl-NL'));
                            setHideShiftTransferForm(true);
                        }
                    });
                }
            } catch (err) {
                console.error(err);
            }
        };
        let result = whatShift();
        if (!result) {
            interval = setInterval(whatShift, 10000);
        }
        interval = setInterval(whatShift, 10000);
        return () => clearInterval(interval);
    }, [postsShiftTransfer, shiftNow, date]);




    // sort users by line
    const lines = (a, b) => {
        return (b.line) - (a.line);
    }

    allMemoToLines = Object.values(allMemoToLines).sort(lines);

    // filter for current user
    allMemoToLines = Object.values(allMemoToLines).filter((mTl) => {
        return mTl.line === user.personnelnumber;
    });


    return (
        <div className='feed'>
            <div className="feedWrapper">
                {/* <ul className="feedEventsList">
                    {Object.values(allEvents).map((event) => {
                        return (
                            <li className="feedEventsInformation" key={event._id}>
                                {event.start.split('T')[0] === date.toLocaleDateString('nl-NL') ?
                                    <div className="feedEventsInformationContent">
                                        <p className="feedEventsInformationHeader">Today:</p>
                                        <p className="feedEventsInformationTitle">{event.title}</p>
                                        <p className="feedEventsInformationDesc">{event.desc}</p>
                                    </div>
                                    : <></>}
                            </li>
                        )
                    })}
                </ul> */}


                <ul className="feedTlToLineList" style={{display:"none"}}>
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

                {/* {user.role === 1 && <MemoToLine />} */}

                <PostTlToLine2 />

                {user.role === 3 && <>
                    {hideShiftTransferForm && <ShiftTransfer2 />}
                </>}

                {/* <Memo /> */}
                {/* {postsShiftTransfer.slice(0, 1).map((st) => (
                    <PostShiftTransfer key={st._id} shiftTransfer={st} />
                ))} */}

                {(!personnelnumber || personnelnumber === user.personnelnumber) && <Share />}


                <ul className="feedTlToLineList">
                    {Object.values(allMemoToLines).map((mTl) => (
                        <li className="feedTlToLineInformation" key={mTl._id}>
                            {mTl?.line === user.personnelnumber ?
                                <>
                                    <PostMemo memo={mTl} />
                                </>
                                :
                                <></>
                            }
                        </li>
                    ))}
                </ul>



                {postsMemo.slice(0, 1).map((m) => (
                    <PostMemo key={m._id} memo={m} />
                ))}
                {posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}
            </div>
        </div >
    );
}
