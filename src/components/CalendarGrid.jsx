import React, { useState } from "react";
import { getMonthDays, formatDate } from "../utils/dateUtils";

const CalendarGrid = ({ events, setSelectedDate, setShowModal }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = getMonthDays(currentMonth);

  const handleDayClick = (day) => {
    // Ensure the date is correctly formatted
    setSelectedDate(formatDate(day.date)); // Use the formatted date to avoid time zone issues
    setShowModal(true);
  };

  const handlePrevMonth = () => {
    const newMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1
    );
    setCurrentMonth(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1
    );
    setCurrentMonth(newMonth);
  };

  // Weekday initials (Sun, Mon, Tue, etc.)
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="nav-button" onClick={handlePrevMonth}>
          Previous
        </button>
        <h2 className="month-year">
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button className="nav-button" onClick={handleNextMonth}>
          Next
        </button>
      </div>
      {/* Weekday initials row */}
      <div className="calendar-weekdays">
        {weekDays.map((day, index) => (
          <div key={index} className="weekday">
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-grid">
        {days.map((day, index) => (
          <div
            key={index}
            className={`day ${day.isToday ? "today" : ""} ${
              day.isSelected ? "selected" : ""
            }`}
            onClick={() => handleDayClick(day)}
          >
            <span>{day.day}</span>
            {events[formatDate(day.date)] && (
              <span className="event-indicator">
                <span className="event-dot"></span>
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
