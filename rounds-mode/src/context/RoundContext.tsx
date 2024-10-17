import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { Round } from '../components/Round';

// Define action types
const ADD_ROUND = 'ADD_ROUND';
const EDIT_ROUND = 'EDIT_ROUND';
const DELETE_ROUND = 'DELETE_ROUND'; // Action type for deleting a round

// Define the state shape
interface RoundState {
  rounds: Round[];
}

// Define action shapes
interface AddRoundAction {
  type: typeof ADD_ROUND;
  payload: Round;
}

interface EditRoundAction {
  type: typeof EDIT_ROUND;
  payload: Round;
}

interface DeleteRoundAction {
  type: typeof DELETE_ROUND;
  payload: string; // The ID of the round to delete
}

type RoundAction = AddRoundAction | EditRoundAction | DeleteRoundAction;

// Initial state with example rounds
const initialState: RoundState = {
  rounds: [
    {
      id: '1',
      date: '2022-10-05',
      course: 'Bryden Canyon',
      type: 'Practice',
      holes: 18,
      strokes: 76,
      time: { minutes: 55, seconds: 0 },
      speedgolfScore: 131,
      notes: '',
      distance: 15840,
    },
    {
      id: '2',
      date: '2022-10-10',
      course: 'Palouse Ridge',
      type: 'Practice',
      holes: 18,
      strokes: 80,
      time: { minutes: 60, seconds: 0 },
      speedgolfScore: 140,
      notes: '',
      distance: 21120,
    },
  ],
};

// Reducer to handle actions
const roundReducer = (state: RoundState, action: RoundAction): RoundState => {
  switch (action.type) {
    case ADD_ROUND:
      return { ...state, rounds: [...state.rounds, action.payload] };
    case EDIT_ROUND:
      return {
        ...state,
        rounds: state.rounds.map((round) =>
          round.id === action.payload.id ? action.payload : round
        ),
      };
    case DELETE_ROUND:
      console.log("Deleting round with ID:", action.payload); // Logging to confirm action
      return {
        ...state,
        rounds: state.rounds.filter((round) => round.id !== action.payload), // Immutably filter out the round by ID
      };
    default:
      return state;
  }
};
// Create the context
const RoundContext = createContext<{
  state: RoundState;
  addRound: (round: Round) => void;
  editRound: (round: Round) => void;
  deleteRound: (id: string) => void; // Include delete action
}>({
  state: initialState,
  addRound: () => {},
  editRound: () => {},
  deleteRound: () => {}, // Empty delete action
});

// Custom hook for accessing the context
export const useRoundContext = () => useContext(RoundContext);

// Provider component
export const RoundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(roundReducer, initialState);

  // Action creators
  const addRound = (round: Round) => {
    dispatch({ type: ADD_ROUND, payload: round });
  };

  const editRound = (round: Round) => {
    dispatch({ type: EDIT_ROUND, payload: round });
  };

  const deleteRound = (id: string) => {
    dispatch({ type: DELETE_ROUND, payload: id }); // Dispatch the delete action with round ID
  };

  return (
    <RoundContext.Provider value={{ state, addRound, editRound, deleteRound }}>
      {children}
    </RoundContext.Provider>
  );
};
