
import React from "react";
import { useContext, useRef, useState, useEffect } from "react";
import { renderToString } from 'react-dom/server'
import "./shiftTransfer2.css";
import { DoNotDisturb, Close, TaskAlt } from "@mui/icons-material"
import { AuthContext } from "../../context/AuthContext";
import axios from "axios"
import WeekNum from "../weekNum/WeekNum";
import  DateTimeShift  from "../dateTimeShift/DateTimeShift";



export default function ShiftTransfer2(shiftTransfer) {
    const API = process.env.REACT_APP_SERVER_API
    const date = new Date();
    const { user } = useContext(AuthContext);
    const [allShiftsTransfer, setAllShiftsTransfer] = useState([]);
    let [allShiftsTransferValues, setAllShiftsTransferValues] = useState([]);

    const [openMessage, setOpenMessage] = useState(false);
    const title = useRef();
    const item = useRef();
    let value = useRef();
    const operator = useRef();
    const message = useRef("");
    const itemNumber = useRef();


    //  const [isChecked, setIsChecked] = useState(false);
    const weekNumber = renderToString(<WeekNum />)
    const shiftNow = renderToString(<DateTimeShift />)


    // when click on radio button this function will be called to update database
    const handleRadioChoice = async (shiftTransfer, e) => {
        const values = {
            shiftTransferItemId: shiftTransfer._id,
            lineId: user.username,
            shift: shiftNow,
            title: shiftTransfer.title,
            value: e.target.value,
            date: date.toLocaleDateString('nl-NL'),
        }
        //console.log(values)
        if (e.target.value === "NotOk") {
            console.log("This is NotOk");
            document.getElementById(`notOk${shiftTransfer._id}`).removeAttribute("style");
            document.getElementById(`N.V.T${shiftTransfer._id}`).style.display = "none";
            document.getElementById(`ok${shiftTransfer._id}`).style.display = "none";
            document.getElementById(`editNotOk${shiftTransfer._id}`).style.display = "block";
            createItem(values)
            getItem()
            setOpenMessage(true)

        }
        if (e.target.value === "N.V.T.") {
            console.log("This is N.V.T.");
            document.getElementById(`ok${shiftTransfer._id}`).style.display = "none";
            document.getElementById(`N.V.T${shiftTransfer._id}`).removeAttribute("style");
            document.getElementById(`notOk${shiftTransfer._id}`).style.display = "none";
            document.getElementById(`editNVT${shiftTransfer._id}`).style.display = "block";
            createItem(values)
            getItem()
            setOpenMessage(true)
        }
        if (e.target.value === "Ok") {
            console.log("This is Ok");
            document.getElementById(`ok${shiftTransfer._id}`).removeAttribute("style");
            document.getElementById(`N.V.T${shiftTransfer._id}`).style.display = "none";
            document.getElementById(`notOk${shiftTransfer._id}`).style.display = "none";
            document.getElementById(`editOk${shiftTransfer._id}`).style.display = "block";
            //createItem(values)  //maybe it's not nessary to createItem Ok
            //getItem() //maybe it's not nessary to getItem Ok
        }
    }




    // create item function to post values to database
    const createItem = (values) => {
        try {
            console.log("Start function createItem");
            sessionStorage.setItem(values.shiftTransferItemId, JSON.stringify(values));
            // axios.post("/shiftTransferValuesAndDescs", values);
            console.log("End function createItem, values posted ok CREATE");
        } catch (err) {
            console.log(err);
        }
    };

    // delete item function
    const deleteItem = (shiftTransfer, e) => {
        try {
            console.log("this delete starts")
            sessionStorage.removeItem(shiftTransfer._id);
            console.log("this delete works")
        } catch (err) {
            console.log(err);
        }
    };


    // get item function to get values
    const getItem = async () => {
        // try {
        console.log("Start function getItem");
        try {
            const allKeys = Object.keys(sessionStorage);
            const res = {};
            for (const key of allKeys) {
                const item = sessionStorage.getItem(key);
                if (item !== null) {
                    const parsedItem = JSON.parse(item);
                    if (parsedItem && parsedItem.lineId === user.username && parsedItem.shift === shiftNow && parsedItem.date === date.toLocaleDateString('nl-NL')) {
                        res[key] = item;
                    }
                }
            }
            console.log(res)
            setAllShiftsTransferValues(res);
            console.log("End function getItem, values got ok GET");
            return res;
        } catch (err) {
            console.error(err);
            return {};
        }
    }

    const deleteAll = async () => {
        try {
            console.log("Start function deleteAll");
            sessionStorage.clear();
            console.log("End function deleteAll, values deleted ok DELETE");
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        const fetchAllShiftsTransfer = async () => {
            try {
                const res = await axios.get(`${API}/shiftTransfersItems/allShiftTransfersItems`);
                setAllShiftsTransfer(res.data);
                // console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllShiftsTransfer();
    }, [API]);

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
           // call action
           submitHandler(e);
       }
     }


    // when click on submit button this function will be called to update database and get new values from database
    const submitHandler = (e) => {
        e.preventDefault();
        const newShiftTransfer = Object.values(allShiftsTransferValues).map((item) => {
            return JSON.parse(item);
        })

        const shiftTransfer = {
            userId: user._id,
            shiftTransferItems: newShiftTransfer.reverse(),
            line: user.username,
            date: date.toLocaleDateString('nl-NL'),
            weekday: date.toLocaleDateString('nl-NL', { weekday: 'long' }),
            weekNumber: weekNumber,
            shift: shiftNow,
            operator: operator.current.value,
            message: message?.current.value ? message?.current.value : "",
        }
        try {
            // console.log(newShiftTransfer);

            // console.log(shiftTransfer);
            axios.post(`${API}/shiftTransfers`, shiftTransfer);
            console.log("shift transfer has been successfully posted");
            setTimeout(() => {
                deleteAll();
                window.location.reload();
            }, 2000);
        } catch (err) {
            console.log(err);
        }
    }

    // edit Ok item and delete Ok item from database
    const handleEditOkItem = async (shiftTransfer, e) => {
        e.preventDefault()
        getItem()
        console.log("Edit Ok Item")
        //deleteItem(shiftTransfer, e) //maybe it's not nessary to deleteItem Ok
        document.getElementById(`okCheck${shiftTransfer._id}`).checked = false;
        document.getElementById(`N.V.T${shiftTransfer._id}`).style.display = "block";
        document.getElementById(`notOk${shiftTransfer._id}`).style.display = "block";
        document.getElementById(`editOk${shiftTransfer._id}`).style.display = "none";
    }

    // edit Not Ok item and delete Not Ok item from database
    const handleEditNotOkItem = (shiftTransfer, e) => {
        e.preventDefault()
        getItem()
        console.log("Edit Not Ok Item")
        deleteItem(shiftTransfer, e)
        document.getElementById(`notOkCheck${shiftTransfer._id}`).checked = false;
        document.getElementById(`N.V.T${shiftTransfer._id}`).removeAttribute("style");
        document.getElementById(`ok${shiftTransfer._id}`).removeAttribute("style");
        document.getElementById(`editNotOk${shiftTransfer._id}`).removeAttribute("style");
    }


    // edit N.V.T item and delete N.V.T item from database
    const handleEditNVTItem = (shiftTransfer, e) => {
        e.preventDefault()
        getItem()
        console.log("Edit NVT Item")
        deleteItem(shiftTransfer, e)
        document.getElementById(`nvtCheck${shiftTransfer._id}`).checked = false;
        document.getElementById(`notOk${shiftTransfer._id}`).removeAttribute("style");
        document.getElementById(`ok${shiftTransfer._id}`).removeAttribute("style");
        document.getElementById(`editNVT${shiftTransfer._id}`).removeAttribute("style");
    }

    // open message
    const handleMessage = () => {
        setOpenMessage(!openMessage);
    }

    return (
        <div className="shiftTransfer">
            <div className="shiftTransferDateTime">
                <div className="shiftTransferDateTimeItem">Week: <span><WeekNum className="shiftTransferWeekNum" /></span></div>
                <p className="shiftTransferDateTimeItem">Shift: <span>{shiftNow}</span></p>
                <p className="shiftTransferDateTimeItem">Day : <span>{date.toLocaleDateString('nl-NL', { weekday: 'long' })}</span></p>
                <p className="shiftTransferDateTimeItem">Date : <span>{date.toLocaleDateString('nl-NL')}</span></p>

            </div>
            <form className="shiftTransferForm" autoComplete="off" onSubmit={submitHandler}>
                {Object.values(allShiftsTransfer).map((shiftTransfer, i) => {
                    return (
                        <div className="shiftTransferItem" key={shiftTransfer._id} ref={item}>
                            <div className="shiftTransferContainer">
                            <p className="shiftTransferItemNumber" ref={itemNumber}>{i + 1}</p>
                                <h5 className="shiftTransferItemTitle" ref={title}>{shiftTransfer.title}</h5>
                                <div className="shiftTransferChoice">
                                    <label className="shiftTransferRadioBtnBorder">
                                        <input
                                            className="shiftTransferRadioBtn"
                                            id={`okCheck${shiftTransfer._id}`}
                                            type="radio"
                                            name={shiftTransfer._id}
                                            ref={value}
                                            defaultValue="Ok"

                                            onClick={(e) => handleRadioChoice(shiftTransfer, e)}

                                        // style={{ display: "none" }}
                                        />
                                        <span className="shiftTransferRadioIconGreen"><TaskAlt id={`ok${shiftTransfer._id}`} /></span>
                                        <button className="shiftTransferRadioEditBtn" id={`editOk${shiftTransfer._id}`} onClick={(e) => handleEditOkItem(shiftTransfer, e)}>Edit</button>
                                    </label>
                                    <label className="shiftTransferRadioBtnBorder" >
                                        <input
                                            className="shiftTransferRadioBtn"
                                            id={`notOkCheck${shiftTransfer._id}`}
                                            type="radio"
                                            name={shiftTransfer._id}
                                            defaultValue="NotOk"
                                            ref={value}

                                            onClick={(e) => handleRadioChoice(shiftTransfer, e)}


                                        // style={{ display: "none" }}
                                        />
                                        <span className="shiftTransferRadioIconRed"><Close id={`notOk${shiftTransfer._id}`} /></span>
                                        <button className="shiftTransferRadioEditBtn editNotOkBtn" id={`editNotOk${shiftTransfer._id}`} onClick={(e) => handleEditNotOkItem(shiftTransfer, e)}>Edit</button>
                                    </label>
                                    <label className="shiftTransferRadioBtnBorder">
                                        <input
                                            className="shiftTransferRadioBtn"
                                            id={`nvtCheck${shiftTransfer._id}`}
                                            type="radio"
                                            name={shiftTransfer._id}
                                            defaultValue="N.V.T."
                                            ref={value}
                                            onClick={(e) => handleRadioChoice(shiftTransfer, e)}

                                        // style={{ display: "none" }}
                                        />
                                        <span className="shiftTransferRadioIconOrange"><DoNotDisturb id={`N.V.T${shiftTransfer._id}`} /></span>
                                        <button className="shiftTransferRadioEditBtn editNVTBtn" id={`editNVT${shiftTransfer._id}`} onClick={(e) => handleEditNVTItem(shiftTransfer, e)}>Edit</button>
                                    </label>
                                </div>
                            </div>

                        </div>
                    )
                })}
                <div className="shiftTransferItem shiftTransferMessage">
                    <p className="shiftTransferItemMessage" onClick={handleMessage}>{openMessage ? "I don't want to leave a message" : "I want to leave message"}</p>
                    {openMessage && (
                        <label className="shiftTransferLabel" htmlFor="message">
                            <textarea
                                type="text"
                                id="message"
                                ref={message}
                                placeholder="What is wrong?"
                                className="shiftTransferDescription"
                            />
                        </label>)}
                </div>
                <div className="shiftTransferContainer">
                    <label className="shiftTransferLabelPersonnelnumber" htmlFor="personnelnumber">
                        <p className="shiftTransferTextPersonnelnumber">Operator</p>
                        <input className="shiftTransferInputPersonnelnumber" id="personnelnumber" ref={operator} type="text" placeholder="0000" minLength={4} maxLength={4} onKeyDown={handleKeyDown} required />
                    </label>
                    <button className="shiftTransferButton" type="submit">Make a shift transfer</button>
                </div>
            </form>
        </div>
    );
}

