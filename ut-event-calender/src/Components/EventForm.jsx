import React, { useState } from "react";

export default function EventForm({ addEvent }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [datetime, setDatetime] = useState("");

    const AddEventHandler = (e) => {
        e.preventDefault();
        if (title && description && datetime) {
            addEvent({
                title,
                description,
                start: new Date(datetime),
            });
            setTitle("");
            setDescription("");
            setDatetime("");
        }
    }

    return (
        <div className="left-div">
            <h2>Create Event</h2>
            <form onSubmit={AddEventHandler}>
                <p>Event Name:</p>
                <input
                    type="text"
                    placeholder="Event Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <br /><br /><br />
                <p>Event Description:</p>
                <textarea
                    placeholder="Event Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <br /><br /><br />
                <p>Event Date:</p>
                <input
                    type="datetime-local"
                    value={datetime}
                    onChange={(e) => setDatetime(e.target.value)}
                    required
                />
                <br /><br /><br />
                <button className="buttonClass" type="submit">Add Event</button>
            </form>
        </div>
    );
}