import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import './sendTlToLine.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import TlToLine from "../../components/tlToLine/TlToLine";
import Rightbar from '../../components/rightbar/Rightbar'
import { HighlightOff } from "@mui/icons-material";

export default function SendTlToLine() {
  const date = new Date();
  let [allTlToLines, setTlToLines] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;


  function addZero(i) {
    if (i < 10) { i = "0" + i }
    return i;
  }

  let hh = addZero(date.getHours());
  let mm = addZero(date.getMinutes());
  let ss = addZero(date.getSeconds());


  let time = date.toLocaleDateString("fr-CA") + "T" + hh + ":" + mm + ":" + ss;


  useEffect(() => {
    let interval;
    const fetchData = async () => {
      try {
        const res = await axios.get("/tlToLines/allTlToLines");
        setTlToLines(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    let result = fetchData()

    if (!result) {
      interval = setInterval(fetchData, 10000);
    }
    
    interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);

  }, []);


  const eventDeleteHandler = (toLines) => {
    try {
      axios.delete(`/tlToLines/${toLines._id}`)
      window.location.reload();
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Topbar />
      <div className='sendTlToLine'>
        <Sidebar />
        <div className="sendTlToLineRight">
          <TlToLine />
          <ul className="feedTlToLineList">
            {Object.values(allTlToLines).map((toLines) => {
              return (
                <li className="feedTlToLineInformation" key={toLines._id}>
                  {/* <div className="editEventsRightItemEditBtn">
                    <Edit className="eventEdit" onClick={() => eventGetHandler(toLines)} />
                  </div> */}

                  <div className="feedTlToLineInformationContent">
                    <p className="feedTlToLineInformationHeader">{toLines.line}</p>
                    {/* <p className="feedTlToLineInformationTitle">{toLines?.title}</p> */}
                    <p className="feedTlToLineInformationDesc">{toLines?.desc}</p>
                    {toLines?.img && <img className="postMemoImg" src={PF + toLines?.img} alt='' />}
                    <div className="sendTlToLineInformationBox">
                      <p className="feedTlToLineInformationDesc">{time}</p>
                      <p className="feedTlToLineInformationDesc">{toLines?.timer}</p>
                      <p className="feedTlToLineInformationDesc">{toLines?.timer < time && eventDeleteHandler(toLines)}</p>
                    </div>
                  </div>
                  <div className="editEventsRightItemDeleteBtn">
                    <HighlightOff className="eventDelete" onClick={() => eventDeleteHandler(toLines)} />
                  </div>

                </li>
              )
            })}
          </ul>
        </div>
        <Rightbar />
      </div>
    </>
  )
}
