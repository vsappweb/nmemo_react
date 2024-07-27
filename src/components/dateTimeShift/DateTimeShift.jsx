import "./dateTimeShift.css";
import WeekNum from "../weekNum/WeekNum";
import { renderToString } from "react-dom/server";

export default function DateTimeShift() {
  const date = new Date();
  const weekNumber = renderToString(<WeekNum />);
  let shiftNow = "";

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  let hh = addZero(date.getHours());
  let mm = addZero(date.getMinutes());
  let ss = addZero(date.getSeconds());

  let time = hh + ":" + mm + ":" + ss;

  if (weekNumber === "31" || weekNumber === "32") {
    shiftNow = time > "07:30:00" && time < "16:15:00" ? "Day" : `T-${time}`;
  } else {
    shiftNow =
      time > "05:45:00" && time < "13:45:00"
        ? "Morning"
        : time > "13:45:00" && time < "22:30:00"
        ? "Afternoon"
        : "Night";
  }
  // let shiftNow = time > "05:45:00" && time < "13:45:00" ? "Morning" : time > "13:45:00" && time < "22:30:00" ? "Afternoon" : "Night"

  return shiftNow;
}
