import React, { useEffect, useRef, useState } from "react";
import "./editCalendar.css";
import axios from "axios";
import { HighlightOff, Edit, CleaningServices } from "@mui/icons-material";
import DateTime from "../dateTime/DateTime";

export default function EditCalendar() {
  const API = process.env.REACT_APP_SERVER_API;
  let [allEvents, setEvents] = useState([]);
  const [getEvent, setGetEvent] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const title = useRef();
  const desc = useRef();
  const startDate = useRef();
  const endDate = useRef();
  const allDay = useRef();

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  // get all events from database
  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await axios.get(`${API}/events/allEvents`);
        setEvents(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getEvents();
  }, [API]);

  // create event in database
  const handleClickCreate = async (e) => {
    e.preventDefault();
    const event = {
      title: title.current.value,
      desc: "( " + desc.current.value + " )",
      start: startDate.current.value,
      end: isChecked ? startDate.current.value : endDate.current.value,
      allDay: allDay.current.value,
    };
    try {

      await axios.post(`${API}/events`, event);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // edit event by id from database
  const handleClickEdit = async (e) => {
    e.preventDefault();
    const event = {
      title: title.current.value,
      desc: desc.current.value,
      start: startDate.current.value,
      end: isChecked ? startDate.current.value : endDate.current.value,
      allDay: allDay.current.value,
    };
    try {
      await axios.put(`${API}/events/${getEvent._id}`, event);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // delete event by id from database
  const eventDeleteHandler = (event) => {
    try {
      axios.delete(`${API}/events/${event._id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // get single event to edit
  const eventGetHandler = (event) => {
    setGetEvent(event);
    setIsChecked(event.allDay);
  };

  // clear single event to edit
  const eventCleanHandler = () => {
    setGetEvent({});
    setIsChecked(false);
    document.getElementById("desc").defaultValue = "";
  };

  // sort events by date and time
  const oldToNew = (a, b) => {
    return new Date(b.start) - new Date(a.start);
  };
  allEvents = Object.values(allEvents).sort(oldToNew);

  return (
    <>
      <div className="editEvents">
        <div className="editEventsLeft">
          <DateTime style={{ width: "100%" }} />
          <div className="editEventsTitleContainer">
            {getEvent._id === undefined ? (
              ""
            ) : (
              <CleaningServices
                className="editEventsBtnClean"
                onClick={eventCleanHandler}
              />
            )}
            <h1 className="editEventsTitle">
              {getEvent._id === undefined ? "Create Event" : "Edit Event"}
            </h1>
          </div>
          <form
            className="editEventsForm"
            autoComplete="off"
            onSubmit={
              getEvent._id === undefined ? handleClickCreate : handleClickEdit
            }
          >
            <label className="editEventsFormItem" htmlFor="title">
              <p className="editEventsFormText">Title:</p>
              <input
                className="editEventsInput"
                type="text"
                placeholder="Name of the event"
                id="title"
                ref={title}
                defaultValue={"" || getEvent.title}
                required
              />
            </label>
            <fieldset className="editEventsBorder">
              <legend className="editEventsBorderTitle">
                {isChecked ? "All day event:" : "Start event:"}
              </legend>
              <input
                className="editEventsDate"
                type="datetime-local"
                id="startDate"
                ref={startDate}
                defaultValue={"" || getEvent.start}
                required
              />
              <label className="editEventsFormItem" htmlFor="allDay">
                <p
                  className="editEventsFormText"
                  style={{ marginLeft: "10px" }}
                >
                  All day:
                </p>
                <input
                  className="editEventsAllDay"
                  type="checkbox"
                  id="allDay"
                  name="allDay"
                  ref={allDay}
                  defaultValue={isChecked ? "true" : "false"}
                  checked={isChecked}
                  onChange={handleOnChange}
                />
              </label>
            </fieldset>
            <fieldset
              className="editEventsBorder"
              style={isChecked ? { display: "none" } : { display: "flex" }}
            >
              <legend className="editEventsBorderTitle">End event:</legend>
              <input
                className="editEventsDate"
                type="datetime-local"
                id="endDate"
                ref={endDate}
                defaultValue={"" || getEvent.end}
              />
            </fieldset>
            <label className="editEventsFormItem" htmlFor="desc">
              <p className="editEventsFormText">Description:</p>
              <textarea
                className="editEventsDesc"
                placeholder="Write description..."
                id="desc"
                ref={desc}
                defaultValue={"" || getEvent.desc}
              ></textarea>
            </label>
            <button className="editEventsBtn" type="submin">
              {getEvent._id === undefined ? "Create" : "Edit"}
            </button>
          </form>
        </div>

        <div className="editEventsRight">
          <fieldset className="editEventsBorderRight">
            <legend className="editEventsRightTitle">All Events</legend>
            <div className="editEventsBox">
              {/* {getEvent._id !== undefined ? 
            <div className="editEventsRightItem">
              <button className="editEventsBtn" style={{ cursor: "pointer", textAlign: "center", color: "green", margin: "15px auto" }} onClick={() => window.location.reload(false)}>Create new event</button>
            </div>
              :
              <></>} */}
              {/* sort events by date and time */}
              {Object.values(allEvents).map((event) => {
                return (
                  <div className="editEventsRightItem" key={event._id}>
                    <div className="editBtn">
                      <Edit
                        className="eventEdit"
                        onClick={() => eventGetHandler(event)}
                      />
                    </div>
                    <div className="editEventsRightItemContent">
                      <p className="editEventsRightItemTitle">{event.title}</p>
                      <p className="editEventsRightItemDesc">{event.desc}</p>
                      <p className="editEventsRightItemStart">{event.start}</p>
                      <p className="editEventsRightItemEnd">{event.end}</p>
                    </div>
                    <div className="deleteBtn">
                      <HighlightOff
                        className="eventDelete"
                        onClick={() => eventDeleteHandler(event)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </fieldset>
        </div>
      </div>
    </>
  );
}
