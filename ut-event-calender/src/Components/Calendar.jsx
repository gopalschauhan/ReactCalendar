import React, { useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventForm from "./EventForm";

export default function Calendar() {
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const addEvent = (event) => {
        setEvents([...events, event]);
    };

    const filteredEvents = events.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const showTooltip = (e) => {
        const tooltip = document.createElement("div");
        tooltip.className = "tooltip";
        tooltip.innerHTML = e.event.extendedProps.description;
        document.body.appendChild(tooltip);
        tooltip.style.position = "absolute";
        tooltip.style.top = `${e.jsEvent.pageY}px`;
        tooltip.style.left = `${e.jsEvent.pageX}px`;
    }

    const hideTooltip = () => {
        const tooltips = document.querySelectorAll(".tooltip");
        tooltips.forEach((tooltip) => tooltip.remove());
    }

    return (
        <div className="container">
            <EventForm addEvent={addEvent} />
            <div className="right-div">
                <div className="searchPanel">
                    <h3>Search for events</h3>
                    <input type="text" className="inputSearch"
                        placeholder="Enter event title or description to search events!"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                    />
                </div>
                <hr />
                <Fullcalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView={"dayGridMonth"}
                    headerToolbar={{
                        start: "prev,next today",
                        center: "title",
                        end: "dayGridMonth,timeGridWeek,timeGridDay"
                    }}
                    events={filteredEvents}
                    eventMouseEnter={showTooltip}
                    eventMouseLeave={hideTooltip}
                    height={"90vh"}
                />
            </div>
        </div>
    );
}