import React, { useState, useEffect, useRef } from 'react';
import '../AddRound/AddRound.css'; // Reuse AddRound CSS for styling
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Round } from '../Round';

interface EditRoundProps {
  round: Round;
  onUpdateRound: (updatedRound: Round) => void;
  onCancel: () => void;
}

const EditRound: React.FC<EditRoundProps> = ({ round, onUpdateRound, onCancel }) => {
  const [date, setDate] = useState(round.date);
  const [course, setCourse] = useState(round.course);
  const [type, setType] = useState(round.type);
  const [holes, setHoles] = useState(round.holes);
  const [strokes, setStrokes] = useState(round.strokes);
  const [minutes, setMinutes] = useState(round.time.minutes);
  const [seconds, setSeconds] = useState(round.time.seconds);
  const [notes, setNotes] = useState(round.notes);

  const [distance, setDistance] = useState(''); // Distance in miles/kilometers
  const [isMiles, setIsMiles] = useState(true); // Default to miles

  const [errorMessage, setErrorMessage] = useState(''); // Error message state

  const speedgolfScore = strokes + minutes; // Calculate Speedgolf Score

  // Refs for error message and distance input
  const errorMessageRef = useRef<HTMLDivElement>(null);
  const distanceInputRef = useRef<HTMLInputElement>(null);

  // Convert feet to miles or kilometers depending on the toggle state
  useEffect(() => {
    const distanceInMiles = round.distance / 5280;
    setDistance(distanceInMiles.toFixed(2)); // Default to miles initially
  }, [round.distance]);

  // Handle unit toggle between miles and kilometers
  const handleUnitToggle = () => {
    if (distance) {
      const distanceValue = parseFloat(distance);
      if (isMiles) {
        setDistance((distanceValue * 1.60934).toFixed(2)); // Convert miles to kilometers
      } else {
        setDistance((distanceValue / 1.60934).toFixed(2)); // Convert kilometers to miles
      }
    }
    setIsMiles(!isMiles); // Toggle the unit
  };

  // Handle form submission for editing a round
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    const distanceValue = parseFloat(distance);
    // Validate distance range (Miles: 0.01 - 62.00, Kilometers: 0.10 - 100.00)
    if (
      (!isMiles && (distanceValue < 0.10 || distanceValue > 100.0)) ||
      (isMiles && (distanceValue < 0.01 || distanceValue > 62.0))
    ) {
      setErrorMessage(
        `Please enter a distance value between ${
          isMiles ? '0.01 and 62 miles (100 km)' : '0.10 and 100 km (62 miles)'
        }.`
      );
      // Focus on the error message
      if (errorMessageRef.current) {
        errorMessageRef.current.focus();
      }
      return; // Prevent further processing if there's an error
    }

    // Convert distance to feet before saving
    const distanceInFeet = isMiles ? distanceValue * 5280 : distanceValue * 3280.84;

    const updatedRound: Round = {
      id: round.id, // Preserve the id
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

    // Clear error message on success
    setErrorMessage('');
    onUpdateRound(updatedRound);
  };

  return (
    <div className="add-round-container">
      <h2>Edit Round</h2>

      {/* Error message section */}
      {errorMessage && (
        <div
          className="alert alert-danger"
          role="alert"
          tabIndex={-1} // Make it focusable
          ref={errorMessageRef} // Set ref to focus on this
          style={{
            backgroundColor: '#f8d7da', // Light red background
            color: '#842029', // Dark red text
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #f5c2c7', // Border for error box
            borderRadius: '5px',
          }}
          onClick={() => distanceInputRef.current?.focus()} // Focus the distance input on click
        >
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="add-round-form" noValidate>
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
          ref={distanceInputRef} // Reference to the distance input field
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
            <i className="fas fa-edit"></i> Update Round
          </button>
          <button type="button" className="cancel-btn" onClick={onCancel}>
            <i className="fas fa-times"></i> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRound;
