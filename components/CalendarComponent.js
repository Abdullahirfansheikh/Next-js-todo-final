// @ts-nocheck


// components/CalendarComponent.js
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [day, setDay] = useState('');

  const handleChange = (date) => {
    const selectedDay = date.toLocaleDateString('en-US', { weekday: 'long' });
    if (selectedDay === 'Saturday' || selectedDay === 'Sunday') {
      setSelectedDate(date);
      setDay(selectedDay);
    } else {
      alert('Please select either Saturday or Sunday.');
    }
  };

  return (
    <div className="p-5 mb-2 rounded-2xl w-full">
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        filterDate={(date) => {
          const day = date.getDay();
          return day === 0 || day === 6; // Only allow Saturdays (6) and Sundays (0)
        }}
        placeholderText="Choose a day"
        className="p-2  rounded-2xl w-full"
      />
      {selectedDate && (
        <div>
          <p >Selected Date: {selectedDate.toLocaleDateString()}</p>
          <p>Day: {day}</p>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
