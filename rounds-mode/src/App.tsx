import React, { useState } from 'react';
import './App.css';
import AddRound from './components/AddRound/AddRound';
import EditRound from './components/EditRound/EditRound';
import { Round } from './components/Round';
import Rounds from './components/Round/Rounds';
import { useRoundContext } from './context/RoundContext';
import { Modal, Button } from 'react-bootstrap';

const App: React.FC = () => {
  const [showAddRoundForm, setShowAddRoundForm] = useState(false);
  const [showEditRoundForm, setShowEditRoundForm] = useState(false);
  const [selectedRound, setSelectedRound] = useState<Round | null>(null);
  const [showViewRoundModal, setShowViewRoundModal] = useState(false);

  const { state, addRound, editRound, deleteRound } = useRoundContext();

  // Show Add Round form
  const handleShowAddRound = () => {
    setShowAddRoundForm(true);
    setShowEditRoundForm(false);
  };

  // Add a new round
  const handleAddRound = (newRound: Round) => {
    addRound(newRound);
    setShowAddRoundForm(false);
  };

  // Cancel adding a round
  const handleCancelAddRound = () => {
    setShowAddRoundForm(false);
  };

  // Show Edit Round form
  const handleEditRoundClick = (round: Round) => {
    setSelectedRound(round);
    setShowEditRoundForm(true);
    setShowAddRoundForm(false);
  };

  // Update an existing round
  const handleUpdateRound = (updatedRound: Round) => {
    editRound(updatedRound);
    setShowEditRoundForm(false);
  };

  // Cancel editing a round
  const handleCancelEditRound = () => {
    setShowEditRoundForm(false);
  };

  // View Round handler
  const handleViewRoundClick = (round: Round) => {
    setSelectedRound(round);
    setShowViewRoundModal(true); // Open the modal when view button is clicked
  };

  // Close the view modal
  const handleCloseViewRoundModal = () => {
    setShowViewRoundModal(false);
  };

  const handleDeleteRoundClick = (id: string) => {
    console.log('Before delete:', state.rounds);
    deleteRound(id);
    console.log('After delete:', state.rounds);
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">
          <div className="navbar-logo">
            <img src="/logo.png" alt="SpeedScore Logo" />
            <span>SpeedScore</span>
          </div>
          <ul className="nav-links">
            <li><a href="/">Feed</a></li>
            <li><a href="/">Rounds</a></li>
            <li><a href="/">Courses</a></li>
            <li><a href="/">Buddies</a></li>
          </ul>
        </nav>
      </header>

      <main className="App-main">
        {showAddRoundForm ? (
          <AddRound onAddRound={handleAddRound} onCancel={handleCancelAddRound} />
        ) : showEditRoundForm && selectedRound ? (
          <EditRound
            round={selectedRound}
            onUpdateRound={handleUpdateRound}
            onCancel={handleCancelEditRound}
          />
        ) : (
          <Rounds
            roundsData={state.rounds}
            onAddRoundClick={handleShowAddRound}
            onEditRoundClick={handleEditRoundClick}
            onViewRoundClick={handleViewRoundClick} // Pass view handler
            onDeleteRoundClick={handleDeleteRoundClick}
          />
        )}

        {/* View Round Modal */}
        <Modal show={showViewRoundModal} onHide={handleCloseViewRoundModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>View Round Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedRound && (
              <>
                <p><strong>Date:</strong> {selectedRound.date}</p>
                <p><strong>Course:</strong> {selectedRound.course}</p>
                <p><strong>Score:</strong> {selectedRound.speedgolfScore}</p>
                <p><strong>Strokes:</strong> {selectedRound.strokes}</p>
                <p><strong>Time:</strong> {selectedRound.time.minutes} min {selectedRound.time.seconds} sec</p>
                <p><strong>Distance:</strong> {(selectedRound.distance / 5280).toFixed(2)} miles</p>
                <p><strong>Notes:</strong> {selectedRound.notes}</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseViewRoundModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
    </div>
  );
};

export default App;
