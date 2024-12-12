import React, { useState, useEffect } from "react";

const EventModal = ({
  date,
  event,
  addEvent,
  editEvent,
  closeModal,
  editingEventIndex,
}) => {
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (event) {
      setEventName(event.eventName);
      setStartTime(event.startTime);
      setEndTime(event.endTime);
      setDescription(event.description || "");
    } else {
      setEventName("");
      setStartTime("");
      setEndTime("");
      setDescription("");
    }
  }, [event]);

  const handleSubmit = () => {
    if (!eventName || !startTime || !endTime) {
      alert("Please fill all required fields.");
      return;
    }
    const newEvent = { eventName, startTime, endTime, description };

    if (event) {
      editEvent(date, editingEventIndex, newEvent); // Edit existing event
    } else {
      addEvent(date, newEvent); // Add new event
    }
    closeModal();
  };

  return (
    <div className="event-modal">
      <div className="modal-content">
        <h3>{event ? `Edit Event for ${date}` : `Add Event for ${date}`}</h3>
        <input
          className="modal-input"
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <input
          className="modal-input"
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          className="modal-input"
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <textarea
          className="modal-input"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button className="modal-button" onClick={handleSubmit}>
          {event ? "Save Changes" : "Add Event"}
        </button>
        <button className="modal-button" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EventModal;
