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

  const handleDeleteRoundClick = (id: string) => {
    console.log('Before delete:', state.rounds); // Check rounds before deletion
    deleteRound(id);
    console.log('After delete:', state.rounds); // This might not immediately reflect due to async state update
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
            onDeleteRoundClick={handleDeleteRoundClick} // Pass delete handler
          />
        )}
      </main>
    </div>
  );
};

export default App;
