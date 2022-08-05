/*Dependancies*/
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import DatePicker from "react-datepicker";

/*Stylesheets*/ 
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import '../stylesheets/Calendar.css';

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});
const events = [
    {}
];

function CalendarChart({ loggedInUser, calendar, refresh, setRefresh }) {
    
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: ""});
  // eslint-disable-next-line
  const [allEvents, setAllEvents] = useState(events);
    
  function update_server(){
    fetch(`http://localhost:9292/calendar/${loggedInUser.id}`, {
      method: 'POST',
      body: JSON.stringify({
        title: newEvent.title,
        start: newEvent.start,
        end: newEvent.end,
      }),
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then((r) => r.json())
    .then((data) => {
      setNewEvent({ title: "", start: "", end: ""})
      setRefresh(!refresh)
    })
  }
  
  function handleAddEvent() {
    update_server()
  }

  function handleDeleteClick() {
    fetch('http://localhost:9292/user/saintJohn95', {
      method: "DELETE",
   })
  }
    return (
        <div className="Calendar">
            <div id="calendar-header">
                <input id="inputOne" type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <DatePicker id="inputsTwo" placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                <DatePicker id="inputsThree" placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
                <button id="add-button" stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>Add Event</button>
                <button id="delete-button" onClick={handleDeleteClick}>Delete Review</button>
            </div>
            <Calendar localizer={localizer} events={calendar}  startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
        </div>
    );
}

export default CalendarChart;