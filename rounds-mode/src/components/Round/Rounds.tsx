import React from 'react';
//import './Rounds.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Round } from '../Round';


interface RoundsProps {
  roundsData: Round[];
  onAddRoundClick: () => void;
  onEditRoundClick: (round: Round) => void; // Add this prop to handle edit click
}

const Rounds: React.FC<RoundsProps> = ({ roundsData, onAddRoundClick, onEditRoundClick }) => {
  return (
    <div className="rounds-container">
      <h2>Rounds</h2>
      <table className="rounds-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Course</th>
            <th>Score</th>
            <th>View/Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {roundsData.length > 0 ? (
            roundsData.map((round, index) => (
              <tr key={index}>
                <td>{round.date}</td>
                <td>{round.course}</td>
                <td>
                  {round.speedgolfScore} ({round.strokes} in {round.time.minutes}:{round.time.seconds.toString().padStart(2, '0')})
                </td>
                <td>
                  <button className="icon-btn" onClick={() => onEditRoundClick(round)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </td>
                <td>
                  <button className="icon-btn delete-btn">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No rounds available</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="new-round-btn-container">
        <button className="new-round-btn" onClick={onAddRoundClick}>
          <FontAwesomeIcon icon={faEdit} /> New Round
        </button>
      </div>
    </div>
  );
};

export default Rounds;
