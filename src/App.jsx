import React, { useState } from "react";
import CalendarGrid from "./components/CalendarGrid";
import EventModal from "./components/EventModal";
import EventListPanel from "./components/EventListPanel";
import "./styles/global.css";

const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState(() => {
    return JSON.parse(localStorage.getItem("events")) || {};
  });
  const [showModal, setShowModal] = useState(false);
  const [modalEvent, setModalEvent] = useState(null); // Track event for modal (new or edit)
  const [editingEventIndex, setEditingEventIndex] = useState(null); // Track index of event to edit

  const handleAddEvent = (date, event) => {
    const updatedEvents = { ...events };
    if (!updatedEvents[date]) {
      updatedEvents[date] = [];
    }
    updatedEvents[date].push(event);
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const handleEditEvent = (date, index, event) => {
    const updatedEvents = { ...events };
    updatedEvents[date][index] = event;
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const handleDeleteEvent = (date, index) => {
    const updatedEvents = { ...events };
    updatedEvents[date].splice(index, 1);
    if (updatedEvents[date].length === 0) {
      delete updatedEvents[date];
    }
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const handleDayClick = (date) => {
    const formattedDate = formatDate(date); // Ensure the date is formatted properly
    setSelectedDate(formattedDate);
    const eventsForDay = events[formattedDate] || [];
    if (eventsForDay.length > 0) {
      setModalEvent(eventsForDay[0]); // If there are events, pre-fill the modal with the first event
    } else {
      setModalEvent(null); // If no event exists, set the modal to add a new event
    }
    setEditingEventIndex(null); // Reset editing index when opening the modal
    setShowModal(true);
  };

  // const handleAddNewEventClick = () => {
  //   setModalEvent(null); // Ensure modalEvent is null when opening for new event
  //   setEditingEventIndex(null); // Reset editing index
  //   setSelectedDate(null); // Clear selected date
  //   setShowModal(true);
  // };

  const handleModalClose = () => {
    setShowModal(false);
    setModalEvent(null); // Reset modalEvent when closing the modal
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>Dynamic Event Calendar</h1>
        {/* <div className="app-nav-buttons">
          <button onClick={handleAddNewEventClick}>Add Event</button>
        </div> */}
      </div>

      <CalendarGrid
        events={events}
        setSelectedDate={setSelectedDate}
        setShowModal={setShowModal}
        handleDayClick={handleDayClick}
      />

      <EventListPanel
        selectedDate={selectedDate}
        events={events[selectedDate] || []}
        onEdit={(index) => {
          setModalEvent(events[selectedDate][index]);
          setEditingEventIndex(index);
          setShowModal(true);
        }}
        onDelete={(index) => handleDeleteEvent(selectedDate, index)}
      />

      {showModal && (
        <EventModal
          date={selectedDate}
          event={modalEvent} // Pass the selected event or null for a new one
          addEvent={handleAddEvent}
          editEvent={handleEditEvent}
          closeModal={handleModalClose}
          editingEventIndex={editingEventIndex}
        />
      )}
    </div>
  );
};

export default App;
