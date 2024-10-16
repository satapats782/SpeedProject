import React, { useState } from 'react';
import './AddRound.css'; // Add any custom styling for the AddRound form
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

  const speedgolfScore = strokes + minutes; // Calculate speedgolf score

  // Handle form submission for adding a new round
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
      notes,
    };

    // Call the onAddRound function passed via props to add the new round
    onAddRound(newRound);
  };

  return (
    <div className="add-round-container">
      <h2>Add New Round</h2>
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
