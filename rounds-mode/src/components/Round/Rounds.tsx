import React, { useState } from 'react';
import './Round.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSort,
  faSortAmountDownAlt,
  faSortAmountDown,
  faEye,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Round } from '../Round';

interface RoundsProps {
  roundsData: Round[];
  onAddRoundClick: () => void;
  onEditRoundClick: (round: Round) => void;
}

const Rounds: React.FC<RoundsProps> = ({
  roundsData,
  onAddRoundClick,
  onEditRoundClick,
}) => {
  const [sortedColumn, setSortedColumn] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortedData, setSortedData] = useState<Round[]>(roundsData);

  // Handle sorting by a specific column
  const handleSort = (column: keyof Round) => {
    let newSortOrder: 'asc' | 'desc' = 'asc';

    // If clicking the same column, toggle the order
    if (sortedColumn === column) {
      newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    }

    const sortedArray = [...sortedData].sort((a, b) => {
      if (newSortOrder === 'asc') {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });

    setSortedData(sortedArray);
    setSortedColumn(column);
    setSortOrder(newSortOrder);
  };

  // Function to get the appropriate sort icon
  const getSortIcon = (column: keyof Round) => {
    if (sortedColumn === column) {
      return sortOrder === 'asc' ? faSortAmountDownAlt : faSortAmountDown;
    }
    return faSort;
  };

  return (
    <div className="rounds-container">
      <h2>Rounds</h2>
      <table className="rounds-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('date')}>
              Date <FontAwesomeIcon icon={getSortIcon('date')} />
            </th>
            <th onClick={() => handleSort('course')}>
              Course <FontAwesomeIcon icon={getSortIcon('course')} />
            </th>
            <th onClick={() => handleSort('speedgolfScore')}>
              Score <FontAwesomeIcon icon={getSortIcon('speedgolfScore')} />
            </th>
            <th onClick={() => handleSort('distance')}>
              Distance <FontAwesomeIcon icon={getSortIcon('distance')} />
            </th>
            <th>View/Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.length > 0 ? (
            sortedData.map((round, index) => (
              <tr key={index}>
                <td>{round.date}</td>
                <td>{round.course}</td>
                <td>
                  {round.speedgolfScore} ({round.strokes} in{' '}
                  {round.time.minutes}:{round.time.seconds
                    .toString()
                    .padStart(2, '0')})
                </td>
                <td>{round.distance.toFixed(2)} km</td> {/* Displaying distance */}
                <td>
                  <button
                    className="icon-btn"
                    onClick={() => onEditRoundClick(round)}
                  >
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
              <td colSpan={6}>No rounds available</td> {/* Update colspan for 6 columns */}
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
