import React, { useEffect, useState } from 'react'
import './events.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import DateTime from '../../components/dateTime/DateTime';

export default function Events() {
  const API = process.env.REACT_APP_SERVER_API;
  const [allEvents, setEvents] = useState([]);

  moment.updateLocale('nl', {
    week: {
        dow: 1,
        doy: 1,
    },
});

  const localizer = momentLocalizer(moment)


  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await axios.get(`${API}/events/allEvents`);
        setEvents(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getEvents()
  }, [API]);

  const events = Object.values(allEvents).map((event) => {
    return (
      {
        'title': moment(event.start, ("YYYY-MM-DD hh:mm A"||"YYYY MM DD hh:mm:ss")).format("hh:mm A") !== moment(event.end, ("YYYY-MM-DD hh:mm A"||"YYYY MM DD hh:mm:ss")).format("hh:mm A") ? event.title + " " + moment(event.start, ("YYYY-MM-DD hh:mm A"||"YYYY MM DD hh:mm:ss")).format("hh:mm A") + " " + event?.desc : event.title + " " + event?.desc,
        'start': moment(event.start, ("YYYY-MM-DD hh:mm A"||"YYYY MM DD hh:mm:ss")),
        'end': moment(event?.end, ("YYYY-MM-DD hh:mm A"||"YYYY MM DD hh:mm:ss")),
        'allDay': event?.allDay,
        'desc': event?.desc
      }
    )
  })


  console.log(events)
  return (
    <>
      <Topbar />
      <div className='events'>
        <Sidebar />
        <div className="eventsRight">
          <DateTime/>
          <Calendar
          // messages={{next: "Następny", previous: "Poprzedni", today: "Dzisiaj", month: "Miesiąc", week: "Tydzień"}}
          // culture='pl-PL'
          // timeslots={1}
          views={['month', 'agenda']}
          onSelectEvent={(event) => alert(event.title)}
          selectable={true}
          defaultDate={new Date()}
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          />

        </div>
      </div>
    </>
  )
}
