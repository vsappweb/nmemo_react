import './dateTimeShift.css'

export default function DateTimeShift() {
    const date = new Date();

    function addZero(i) {
        if (i < 10) { i = "0" + i }
        return i;
    }

    let hh = addZero(date.getHours());
    let mm = addZero(date.getMinutes());
    let ss = addZero(date.getSeconds());

    let time = hh + ":" + mm + ":" + ss;

    let shiftNow = time > "05:45:00" && time < "13:45:00" ? "Morning" : time > "13:45:00" && time < "22:30:00" ? "Afternoon" : "Night"

    return (
        shiftNow
    )
}