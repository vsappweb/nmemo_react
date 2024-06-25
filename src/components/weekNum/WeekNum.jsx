import './weekNum.css'

export default function WeekNum() {
    // This script is released to the public domain and may be used, modified and
    // distributed without restrictions. Attribution not necessary but appreciated.
    // Source: https://weeknumber.net/how-to/javascript
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    today.setDate(today.getDate() + 3 - (today.getDay() + 6) % 7);
    const firstDayOfYearUTC1 = new Date(today.getFullYear(), 0, 4);
    const weekNum = 1 + Math.round(((today.getTime() - firstDayOfYearUTC1.getTime()) / 86400000 - 3 + (firstDayOfYearUTC1.getDay() + 6) % 7) / 7);
    
  return (
    weekNum
  )
}
