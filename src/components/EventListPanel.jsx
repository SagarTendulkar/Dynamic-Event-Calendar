import React from "react";
import "./EventListPanel.css";

const EventListPanel = ({ selectedDate, events = [], onEdit, onDelete }) => {
  // Ensure `events` is always an array
  const eventList = Array.isArray(events) ? events : [];

  return (
    <div className="event-list-panel">
      <h3>Events for Selected Day</h3>
      {eventList.length === 0 ? (
        <p>No events for this day.</p>
      ) : (
        <ul className="event-list">
          {eventList.map((event, index) => (
            <li key={index} className="event-item">
              <div>
                <strong>{event.eventName}</strong>
                <p>{`${event.startTime} - ${event.endTime}`}</p>
                <p>{event.description}</p>
              </div>
              <div className="event-actions">
                <button onClick={() => onEdit(index)}>Edit</button>
                <button onClick={() => onDelete(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventListPanel;
