import React, { useState } from 'react';
import '../AddRound/AddRound.css'; // Reuse AddRound CSS for styling
import { Round } from '../Round';



interface EditRoundProps {
  round: Round;
  onUpdateRound: (updatedRound: Round) => void;
  onCancel: () => void;
}

const EditRound: React.FC<EditRoundProps> = ({ round, onUpdateRound, onCancel }) => {
  // Initialize form fields with the values from the selected round
  const [date, setDate] = useState(round.date);
  const [course, setCourse] = useState(round.course);
  const [type, setType] = useState(round.type);
  const [holes, setHoles] = useState(round.holes);
  const [strokes, setStrokes] = useState(round.strokes);
  const [minutes, setMinutes] = useState(round.time.minutes);
  const [seconds, setSeconds] = useState(round.time.seconds);
  const [notes, setNotes] = useState(round.notes);

  const speedgolfScore = strokes + minutes; // Calculate the Speedgolf Score

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create updated round object (preserve id)
    const updatedRound: Round = {
      id: round.id, // Preserve the id
      date, // New or updated date
      course,
      type,
      holes,
      strokes,
      time: { minutes, seconds },
      speedgolfScore,
      notes,
    };

    // Pass updated round to parent component
    onUpdateRound(updatedRound);
  };

  return (
    <div className="add-round-container">
      <h2>Edit Round</h2>
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
            min={10}
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
