import React, { useState } from 'react';
import './AddRound.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Round } from '../Round';

interface AddRoundProps {
  onAddRound: (newRound: Round) => void; 
  onCancel: () => void; 
}

const AddRound: React.FC<AddRoundProps> = ({ onAddRound, onCancel }) => {
  const [date, setDate] = useState('');
  const [course, setCourse] = useState('');
  const [type, setType] = useState('Practice'); 
  const [holes, setHoles] = useState(18);
  const [strokes, setStrokes] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [notes, setNotes] = useState('');
  const [distance, setDistance] = useState('');
  const [isMiles, setIsMiles] = useState(true); // Unit of measurement: Miles or Kilometers

  const [errorMessage, setErrorMessage] = useState(''); // Error message state

  // Calculate speedgolf score
  const speedgolfScore = strokes + minutes;

  // Toggle between miles and kilometers
  const handleUnitToggle = () => {
    if (distance) {
      const distanceValue = parseFloat(distance);
      if (isMiles) {
        setDistance((distanceValue * 1.60934).toFixed(2)); // Convert miles to kilometers
      } else {
        setDistance((distanceValue / 1.60934).toFixed(2)); // Convert kilometers to miles
      }
    }
    setIsMiles(!isMiles); // Toggle between units
  };

  // Handle form submission for adding a new round
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const distanceValue = parseFloat(distance);
    // Validate distance range
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

    // Create a new unique id for the new round
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

    // Save the new round to localStorage
    const storedRounds = JSON.parse(localStorage.getItem('rounds') || '[]');
    const updatedRounds = [...storedRounds, newRound];
    localStorage.setItem('rounds', JSON.stringify(updatedRounds));

    // Call the onAddRound function to add the round to the local state
    onAddRound(newRound);

    try {
      // Send data to the backend via POST request
      const response = await fetch('http://localhost:5000/api/rounds/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Use token for authentication
        },
        body: JSON.stringify(newRound),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Round added successfully');
      } else {
        setErrorMessage(data.error || 'Something went wrong.');
      }
    } catch (error) {
      setErrorMessage('Failed to connect to the server.');
    }
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
