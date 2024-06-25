
/*eslint no-undef: "error"*/
import React, { useContext, useRef, useState } from "react";
import "./shiftTransfer.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios"
import DateTime from "../dateTime/DateTime";
import { TaskAlt, Close } from "@mui/icons-material";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";



export default function ShiftTransfer() {
    const [
        selectedValue,
        setSelectedValue,
    ] = useState("option1");

    // const handleRadioChange = ( 
    //     value 
    // ) => { 
    //     setSelectedValue(value); 
    // }; 
    const styles = {
        // container: { 
        //     display: "flex", 
        //     justifyContent: "center", 
        //     alignItems: "center", 
        // }, 
        heading: {
            color: "green",
            textAlign: "center",
        },
        radioButton: {
            padding: "8px 8px",
            borderRadius: "8px",
            margin: "5px",
            border: "2px solid orange",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            transition:
                "background-color 0.3s, color 0.3s",
        },
        selected: {
            background: "green",
            color: "#fff",
            borderColor: "darkgreen",
        },
        list: {
            listStyleType: "none",
            padding: 0,
            textAlign: "center",
        },
    };
    const CustomRadioButton = ({
        label,
        name,
        selected,
        onSelect,
    }) => (
        <li>
            <button
                style={{
                    ...styles.radioButton,
                    ...(selected
                        ? styles.selected
                        : {}),
                }}
                onClick={onSelect}
            >
                {label}
            </button>
        </li>
    );
    const { user } = useContext(AuthContext);

    // const [selectedValue,setSelectedValue] = useState(null);

    const desc = useRef();
    const ok = useRef();
    const nok = useRef();
    const nvt = useRef();
    const operator = useRef();
    const title = useRef();
    // const shift=useRef();
    const date = new Date();
    let shiftNow = date.getHours() > 6 && date.getHours() < 14 ? "Morning shift" : date.getHours() < 14 && date.getHours() > 22 ? "Afternoon shift" : "Night shift"




    const submitHandler = async (e) => {
        e.preventDefault()
        const shiftTransfer = {
            lineId: user.username,
            operator: operator.current.value,
            title: title.current.value,
            shift: shiftNow,
            desc: desc.current.value,
            ok: ok.current.value || nok.current.value || nvt.current.value,
        };
        try {
            console.log(shiftTransfer)
            await axios.post("/shiftTransfers", shiftTransfer);
            // window.location.reload();
        } catch (err) {
            console.log(err)
        }
    }

    // const okHandler = async (_this) => {

    //         _this.style.backgroundColor = "red";


    // }
    // const nokHandler = async (e) => {
    //     const value = nok.current.value
    //     console.log(value)
    // }
    // const nvtHandler = async (e) => {
    //     const value = nvt.current.value
    //     console.log(value)
    // }

    const ShiftTransferItem = (props) => {

        return <label>
            <div style={{}}>
                <div className="shiftTransferItem">
                    <Accordion>

                        <div className="shiftTransferBox">
                            <h3 className="shiftTransferItemTitle" ref={title}>{props.title}</h3>

                            <ul className="shiftTransferList" style={styles.list}>
                                <CustomRadioButton
                                    label={<TaskAlt htmlColor="green" />}

                                    name={props.name}
                                    selected={
                                        selectedValue ===
                                        "option1"
                                    }
                                    onSelect={() =>
                                        setSelectedValue(
                                            "option1"
                                        )
                                    }
                                />
                                <AccordionSummary>

                                    <CustomRadioButton
                                        label={<Close htmlColor="red" />}

                                        name={props.name}
                                        selected={
                                            selectedValue ===
                                            "option2"
                                        }
                                        onSelect={() =>
                                            setSelectedValue(
                                                "option2"
                                            )
                                        }
                                    />
                                </AccordionSummary>
                                <CustomRadioButton
                                    label="N.V.T."

                                    name={props.name}
                                    selected={
                                        selectedValue ===
                                        "option3"
                                    }
                                    onSelect={() =>
                                        setSelectedValue(
                                            "option3"
                                        )
                                    }
                                />
                            </ul>

                            {/* <button className="shiftTransferChoice" value="1" ref={props.ok}><TaskAlt htmlColor="green" /></button>
                            <AccordionSummary>
                                <button className="shiftTransferChoice" value="0" ref={props.nok}><Close htmlColor="red" /></button>
                            </AccordionSummary>
                            <button className="shiftTransferChoice" value="2" ref={props.nvt}>N.V.T.</button> */}


                            {/* <EditNote /> */}

                        </div>

                        <AccordionDetails>

                            <input className="shiftTransferInput" type="text" placeholder={"Please leave information " + user.personnelnumber + "?"} ref={props.desc} />

                        </AccordionDetails>
                    </Accordion>

                </div>
                <hr className="shiftTransferHr" />
            </div>
        </label>
    }


    return (
        <div className="shiftTransfer">
            <form className="shiftTransferForm" onSubmit={submitHandler}>
                <div className="shiftTransferWrapper">

                    <div className="shiftTransferTitle">
                        <p className="shiftTransferHeaderItem">{shiftNow}</p>
                        <p className="shiftTransferHeaderItem">{user.username}</p>
                        <div className="shiftTransferOperatorBox">
                            <p className="shiftTransferHeaderItem">Operator:</p>
                            <input className="shiftTransferInputOperator" type="text" maxLength={4} minLength={4} defaultValue={user.personnelnumber} ref={operator} />
                        </div>
                    </div>
                    <div className="shiftTransferItems">
                        <ShiftTransferItem name={"shift"} ok={ok} nok={nok} nvt={nvt} desc={desc} title={"Next shift measures profile and enter results measurement in Dataliser"} />
                        <ShiftTransferItem name={"shift2"} ok={ok} nok={nok} nvt={nvt} desc={desc} title={"Measuring table is clean and measurement tools are complete and order"} />
                        <ShiftTransferItem ok={ok} nok={nok} nvt={nvt} desc={desc} title={"The workplace and mill are cleaned up"} />
                        <ShiftTransferItem ok={ok} nok={nok} nvt={nvt} desc={desc} title={"All objects in the workplace are in right, fixed place"} />
                        <ShiftTransferItem ok={ok} nok={nok} nvt={nvt} desc={desc} title={"The tool board is complete"} />
                        <ShiftTransferItem ok={ok} nok={nok} nvt={nvt} desc={desc} title={"Cleaning cloths and absorption granules are present"} />
                        <ShiftTransferItem ok={ok} nok={nok} nvt={nvt} desc={desc} title={"All oil jars are complete, in the right place and filled"} />
                        <ShiftTransferItem ok={ok} nok={nok} nvt={nvt} desc={desc} title={"Band welding equipment is complete and clean"} />
                        <ShiftTransferItem ok={ok} nok={nok} nvt={nvt} desc={desc} title={"Packaging is ready"} />
                        <ShiftTransferItem ok={ok} nok={nok} nvt={nvt} desc={desc} title={"Production waste bin and garbage bin are emptied if necessary"} />
                    </div>
                </div>
                <button className="shiftTransferButton" type="submit">Make a shift transfer</button>
            </form>
            <DateTime />
        </div>
    )
}
