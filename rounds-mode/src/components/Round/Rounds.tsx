import React, { useState, useEffect } from 'react';
import './Round.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSort,
  faSortAmountDownAlt,
  faSortAmountDown,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap components for modal
import { Round } from '../Round';

interface RoundsProps {
  roundsData: Round[];
  onAddRoundClick: () => void;
  onEditRoundClick: (round: Round) => void;
  onDeleteRoundClick: (id: string) => void;
}

const Rounds: React.FC<RoundsProps> = ({
  roundsData,
  onAddRoundClick,
  onEditRoundClick,
  onDeleteRoundClick,
}) => {
  const [sortedColumn, setSortedColumn] = useState<string>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortedData, setSortedData] = useState<Round[]>(roundsData);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roundToDelete, setRoundToDelete] = useState<string | null>(null);

  // Update sortedData when roundsData changes
  useEffect(() => {
    setSortedData(roundsData);
  }, [roundsData]);

  // Handle sorting by a specific column
  const handleSort = (column: keyof Round) => {
    let newSortOrder: 'asc' | 'desc' = 'asc';

    // Toggle sorting order if the same column is clicked
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
    setSortedColumn(column as string);
    setSortOrder(newSortOrder);
  };

  // Get the appropriate sort icon based on current sort state
  const getSortIcon = (column: keyof Round) => {
    if (sortedColumn === column) {
      return sortOrder === 'asc' ? faSortAmountDownAlt : faSortAmountDown;
    }
    return faSort;
  };

  // Open delete confirmation modal
  const handleDeleteClick = (id: string) => {
    setRoundToDelete(id);
    setShowDeleteModal(true);
  };

  // Confirm deletion
  const confirmDelete = () => {
    if (roundToDelete) {
      onDeleteRoundClick(roundToDelete); // Trigger the delete handler with round ID
      setShowDeleteModal(false); // Close the modal after deletion
    }
  };

  // Close the modal without deleting
  const handleClose = () => {
    setShowDeleteModal(false);
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
                  {round.time.minutes}:{round.time.seconds.toString().padStart(2, '0')})
                </td>
                <td>{(round.distance / 5280).toFixed(2)} miles</td> {/* Convert feet to miles */}
                <td>
                  <button className="icon-btn" onClick={() => onEditRoundClick(round)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </td>
                <td>
                  <button
                    className="icon-btn delete-btn"
                    onClick={() => handleDeleteClick(round.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No rounds available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Delete confirmation modal */}
      <Modal show={showDeleteModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Round?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to delete this round?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No, Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes, Delete Round
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="new-round-btn-container">
        <button className="new-round-btn" onClick={onAddRoundClick}>
          <FontAwesomeIcon icon={faEdit} /> New Round
        </button>
      </div>
    </div>
  );
};

export default Rounds;
