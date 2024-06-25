import React from 'react'
import './editEvents.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import EditCalendar from '../../components/editCalendar/EditCalendar'


export default function EditEvents() {

  return (
    <>
      <Topbar />
      <div className='events'>
        <Sidebar />
        <div className="eventsRight">
          <EditCalendar />
        </div>
      </div>
    </>
  )
}
