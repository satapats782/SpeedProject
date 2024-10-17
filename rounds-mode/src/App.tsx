import React, { useState } from 'react';
import './App.css';
import AddRound from './components/AddRound/AddRound';
import EditRound from './components/EditRound/EditRound';
import { Round } from './components/Round';
import Rounds from './components/Round/Rounds';
import { useRoundContext } from './context/RoundContext';


const App: React.FC = () => {
  const [showAddRoundForm, setShowAddRoundForm] = useState(false);
  const [showEditRoundForm, setShowEditRoundForm] = useState(false);
  const [selectedRound, setSelectedRound] = useState<Round | null>(null);

  // Access rounds and action creators from the context
  const { state, addRound, editRound } = useRoundContext();

  // Show Add Round form
  const handleShowAddRound = () => {
    setShowAddRoundForm(true);
    setShowEditRoundForm(false); // Hide edit form
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
    setSelectedRound(round); // Set selected round for editing
    setShowEditRoundForm(true);
    setShowAddRoundForm(false); // Hide add form
  };

  // Update an existing round
  const handleUpdateRound = (updatedRound: Round) => {
    editRound(updatedRound); // Update the round in the context
    setShowEditRoundForm(false); // Hide edit form
  };

  // Cancel editing a round
  const handleCancelEditRound = () => {
    setShowEditRoundForm(false);
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
          />
        )}
      </main>
    </div>
  );
};

export default App;
