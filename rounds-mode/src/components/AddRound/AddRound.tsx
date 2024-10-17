import React, { useState } from 'react';
import './AddRound.css'; // Add any custom styling for the AddRound form
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Round } from '../Round';

interface AddRoundProps {
  onAddRound: (newRound: Round) => void; // Function to handle adding a new round
  onCancel: () => void; // Function to handle cancel action
}

const AddRound: React.FC<AddRoundProps> = ({ onAddRound, onCancel }) => {
  // Initialize form states for new round fields
  const [date, setDate] = useState('');
  const [course, setCourse] = useState('');
  const [type, setType] = useState('Practice'); // Default to Practice
  const [holes, setHoles] = useState(18); // Default to 18 holes
  const [strokes, setStrokes] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [notes, setNotes] = useState('');
  const [distance, setDistance] = useState(''); // New Distance Field
  const [isMiles, setIsMiles] = useState(true); // Default to Miles

  const speedgolfScore = strokes + minutes; // Calculate speedgolf score
  const [errorMessage, setErrorMessage] = useState(''); // Error message state

  // Function to handle the unit toggle between miles and kilometers
  const handleUnitToggle = () => {
    if (distance) {
      const distanceValue = parseFloat(distance);
      if (isMiles) {
        setDistance((distanceValue * 1.60934).toFixed(2)); // Convert miles to km
      } else {
        setDistance((distanceValue / 1.60934).toFixed(2)); // Convert km to miles
      }
    }
    setIsMiles(!isMiles); // Toggle the unit state
  };

  // Handle form submission for adding a new round
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const distanceValue = parseFloat(distance);
    // Validate distance range (Miles: 0.01 - 62.00, Kilometers: 0.10 - 100.00)
    if (
      (!isMiles && (distanceValue < 0.10 || distanceValue > 100.0)) ||
      (isMiles && (distanceValue < 0.01 || distanceValue > 62.0))
    ) {
      setErrorMessage(
        `Distance must be between ${
          isMiles ? '0.01 and 62.00 miles' : '0.10 and 100.00 kilometers'
        }.`
      );
      return;
    }

    // Convert distance to feet before saving
    const distanceInFeet = isMiles ? distanceValue * 5280 : distanceValue * 3280.84;

    // Create a new unique id for each new round
    const newRound: Round = {
      id: Math.random().toString(36).substr(2, 9), // Generate a unique id
      date,
      course,
      type,
      holes,
      strokes,
      time: { minutes, seconds },
      speedgolfScore,
      distance: distanceInFeet, // Save distance in feet
      notes,
    };

    // Call the onAddRound function passed via props to add the new round
    onAddRound(newRound);
  };

  return (
    <div className="add-round-container">
      <h2>Add New Round</h2>
      {errorMessage && (
        <div className="alert alert-danger" role="alert" tabIndex={-1}>
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} className="add-round-form">
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label>Course:</label>
        <input
          type="text"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          maxLength={50}
          required
        />

        <label>Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Practice">Practice</option>
          <option value="Tournament">Tournament</option>
        </select>

        <label>Holes:</label>
        <input
          type="number"
          value={holes}
          onChange={(e) => setHoles(Number(e.target.value))}
          min={9}
          max={18}
          required
        />

        <label>Strokes:</label>
        <input
          type="number"
          value={strokes}
          onChange={(e) => setStrokes(Number(e.target.value))}
          min={9}
          max={200}
          required
        />

        <label>Time (Minutes & Seconds):</label>
        <div className="time-inputs">
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            min={0}
            max={400}
            required
          />
          <span>:</span>
          <input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(Number(e.target.value))}
            min={0}
            max={59}
            required
          />
        </div>

        <label>Speedgolf Score:</label>
        <input type="text" value={speedgolfScore} readOnly />

        <label>Distance:</label>
        <input
          type="number"
          step="0.01"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          min={isMiles ? 0.01 : 0.1}
          max={isMiles ? 62.0 : 100.0}
          placeholder={`Enter distance in ${isMiles ? 'miles' : 'kilometers'}`}
        />

        <div className="form-switch">
          <input
            type="checkbox"
            className="form-check-input"
            checked={isMiles}
            onChange={handleUnitToggle}
          />
          <label className="form-check-label">
            {isMiles ? 'Miles' : 'Kilometers'}
          </label>
        </div>

        <label>Notes:</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          maxLength={500}
        />

        <div className="form-actions">
          <button type="submit" className="add-round-btn">
            <i className="fas fa-plus"></i> Add Round
          </button>
          <button type="button" className="cancel-btn" onClick={onCancel}>
            <i className="fas fa-times"></i> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRound;
