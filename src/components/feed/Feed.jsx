import { useContext, useEffect, useState } from "react";
import { renderToString } from 'react-dom/server'
import Post from "../post/Post";
import PostMemo from "../postMemo/PostMemo";
import PostShiftTransfer from "../postShiftTransfer/PostShiftTransfer";
import Share from "../share/Share";
// import Memo from "../memo/Memo";
// import ShiftTransfer from "../shiftTransfer/ShiftTransfer";
import TlToLine from "../tlToLine/TlToLine";
// import PostTlToLine from "../postTlToLine/PostTlToLine";
import ShiftTransfer2 from "../shiftTransfer2/ShiftTransfer2";
import "./feed.css";
import axios from "axios"
import { AuthContext } from "../../context/AuthContext";
import DateTimeShift from "../dateTimeShift/DateTimeShift";

export default function Feed({ personnelnumber, shiftTransfer }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const date = new Date();
    const [posts, setPosts] = useState([]);
    // const [postTlToLines, setPostTlToLines] = useState([]);
    const [postsMemo, setPostsMemo] = useState([]);
    const [postsShiftTransfer, setPostsShiftTransfer] = useState([]);
    const { user } = useContext(AuthContext)
    // let [allEvents, setEvents] = useState([]);
    let [allTlToLines, setTlToLines] = useState([]);
    const [hideShiftTransferForm, setHideShiftTransferForm] = useState(true);


    // get all events from database 
    const shiftNow = renderToString(<DateTimeShift />);



    function addZero(i) {
        if (i < 10) { i = "0" + i }
        return i;
    }

    let hh = addZero(date.getHours());
    let mm = addZero(date.getMinutes());
    let ss = addZero(date.getSeconds());


    let time = date.toLocaleDateString('nl-NL') + "T" + hh + ":" + mm + ":" + ss;



    // // get all events from database 
    // useEffect(() => {
    //     let interval;
    //     const fetchData = async () => {
    //         try {
    //             const res = await axios.get("/events/allEvents");
    //             setEvents(res.data);
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     };

    //     let result = fetchData()

    //     if (!result) {
    //         interval = setInterval(fetchData, 10000);
    //     }

    //     interval = setInterval(fetchData, 10000);
    //     return () => clearInterval(interval);
    // }, []);


    // get all tlToLines from database
    useEffect(() => {
        let interval;
        const fetchData = async () => {
            try {
                const res = await axios.get("/tlToLines/allTlToLines");
                setTlToLines(res.data);
                console.log("test refresh")
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
    }, []);

    // delete tlToLine from database
    const eventDeleteHandler = (toLines) => {
        try {
            axios.delete(`/tlToLines/${toLines._id}`)
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    }


    // useEffect(() => {
    //     const fetchPostsShiftTransfer = async () => {
    //         const res = personnelnumber
    //             ? await axios.get("/shiftTransfers/profile/" + personnelnumber)
    //             : await axios.get("shiftTransfers/timeline/" + user._id);
    //         setPostsShiftTransfer(res.data.sort((st1, st2) => {
    //             return new Date(st2.createdAt) - new Date(st1.createdAt);
    //         }));
    //     };
    //     fetchPostsShiftTransfer();
    // }, [personnelnumber, user._id])
    useEffect(() => {
        const fetchPostsShiftTransfer = async () => {
            const res = await axios.get("/shiftTransfers/profile/" + user.personnelnumber)
            setPostsShiftTransfer(res.data.sort((st1, st2) => {
                return new Date(st2.createdAt) - new Date(st1.createdAt);
            }));
        };
        fetchPostsShiftTransfer();
    }, [user.personnelnumber])


    // useEffect(() => {
    //     const fetchPostToLines = async () => {
    //         const res = personnelnumber
    //             ? await axios.get("/tlToLines/profile/" + personnelnumber)
    //             : await axios.get("tlToLines/timeline/" + user._id);
    //         setPostTlToLines(res.data.sort((m1, m2) => {
    //             return new Date(m2.createdAt) - new Date(m1.createdAt);
    //         }));
    //     };
    //     fetchPostToLines();
    // }, [personnelnumber, user._id])

    useEffect(() => {
        const fetchPostsMemo = async () => {
            const res = personnelnumber
                ? await axios.get("/memos/profile/" + personnelnumber)
                : await axios.get("memos/timeline/" + user._id);
            setPostsMemo(res.data.sort((m1, m2) => {
                return new Date(m2.createdAt) - new Date(m1.createdAt);
            }));
        };
        fetchPostsMemo();
    }, [personnelnumber, user._id])


    useEffect(() => {
        const fetchPosts = async () => {
            const res = personnelnumber
                ? await axios.get("/posts/profile/" + personnelnumber)
                : await axios.get("posts/timeline/" + user._id);
            setPosts(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }));
        };
        fetchPosts();
    }, [personnelnumber, user._id])

    useEffect(() => {
        let interval;
        const whatShift = async () => {
            try {
                console.log(hideShiftTransferForm);
                if (postsShiftTransfer) {
                    Object.values(postsShiftTransfer).forEach((postsShiftTransfer) => {
                        if (postsShiftTransfer.shift === shiftNow && postsShiftTransfer.date === date.toLocaleDateString('nl-NL')) {
                            setHideShiftTransferForm(false);
                        } else if (postsShiftTransfer.shift !== shiftNow && postsShiftTransfer.date === date.toLocaleDateString('nl-NL')) {
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
        return () => clearInterval(interval);
    }, [postsShiftTransfer, shiftNow, date]);


    // useEffect(() => {
    //     // TODO: fix this in the future when we have more than one shift transfer 
    //     let interval;
    //     const whatShift = async () => {
    //         try {
    //             // if (postsShiftTransfer && Object.values(postsShiftTransfer).length > 0) {
    //             //     console.log(postsShiftTransfer._id);
    //             Object.values(postsShiftTransfer).forEach((postsShiftTransfer) => {
    //                 if (
    //                     postsShiftTransfer.shift === shiftNow && postsShiftTransfer.date === date.toLocaleDateString('nl-NL')
    //                 ) {
    //                     console.log(postsShiftTransfer._id);
    //                     setHideShiftTransferForm(true);
    //                     console.log("hide");
    //                     console.log(shiftNow);
    //                 }
    //                 if (
    //                     postsShiftTransfer?.shift !== shiftNow &&
    //                     postsShiftTransfer?.date === date?.toLocaleDateString('nl-NL')
    //                 ) {
    //                     setHideShiftTransferForm(false);
    //                     console.log("show");
    //                     console.log(shiftNow);
    //                 }
    //             });
    //             // }
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     };

    //     let result = whatShift()

    //     if (!result) {
    //         interval = setInterval(whatShift, 10000);
    //     }
    //     interval = setInterval(whatShift, 10000); //set your time here. repeat every 10 seconds
    //     return () => clearInterval(interval);
    // }, [postsShiftTransfer]);




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
                                        <p className="feedTlToLineInformationDesc" style={{ fontSize: "10px" }}>The message is valid until {toLines?.timer}</p>
                                        {/* <p className="feedTlToLineInformationDesc" style={{ fontSize: "10px" }}>The message is valid until {toLines?.timer < time && eventDeleteHandler(toLines)}</p> */}
                                    </div>
                                    :
                                    toLines.line === "forAll" ?
                                        <div className="feedTlToLineInformationContent">
                                            <p className="feedTlToLineInformationHeader">Group:</p>
                                            {/* <p className="feedTlToLineInformationTitle">{toLines.title}</p> */}
                                            <p className="feedTlToLineInformationDesc">{toLines.desc}</p>
                                            {toLines?.img && <img className="postMemoImg" src={PF + toLines?.img} alt='' />}
                                            <p className="feedTlToLineInformationDesc" style={{ fontSize: "10px" }}>The message is valid until {toLines?.timer}</p>
                                            {/* <p className="feedTlToLineInformationDesc" style={{ fontSize: "10px" }}>The message is valid until {toLines?.timer < time && eventDeleteHandler(toLines)}</p> */}
                                        </div>
                                        :
                                        <></>
                                }
                            </li>
                        )
                    })}
                </ul>

                {/* {user.role === 2 && <TlToLine />} */}

                {user.role === 3 && <>
                    {hideShiftTransferForm && <ShiftTransfer2 />}
                </>}

                {/* <Memo /> */}
                {/* {postsShiftTransfer.slice(0, 1).map((st) => (
                    <PostShiftTransfer key={st._id} shiftTransfer={st} />
                ))} */}
                {(!personnelnumber || personnelnumber === user.personnelnumber) && <Share />}
                {postsMemo.slice(0, 1).map((m) => (
                    <PostMemo key={m._id} memo={m} />
                ))}
                {posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}
            </div>
        </div>
    );
}
