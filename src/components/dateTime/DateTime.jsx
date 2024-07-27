import React from "react";
import "./dateTime.css";
import { useState, useEffect } from "react";
import WeekNum from "../weekNum/WeekNum";

export default function DateTime() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <div className="dateTimeContainer">
      <p> Time : {date.toLocaleTimeString("nl-NL")}</p>
      <p> Date : {date.toLocaleDateString("nl-NL")}</p>
      <p> Day : {date.toLocaleDateString("nl-NL", { weekday: "long" })}</p>
      <p>
        {" "}
        Week : <WeekNum />
      </p>
    </div>
  );
}
