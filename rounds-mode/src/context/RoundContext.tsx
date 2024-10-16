import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { Round } from '../components/Round';


// Define action types
const ADD_ROUND = 'ADD_ROUND';
const EDIT_ROUND = 'EDIT_ROUND';

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

type RoundAction = AddRoundAction | EditRoundAction;

// Initial state with example rounds (you can start with an empty array)
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
    default:
      return state;
  }
};

// Create the context
const RoundContext = createContext<{
  state: RoundState;
  addRound: (round: Round) => void;
  editRound: (round: Round) => void;
}>({
  state: initialState,
  addRound: () => {},
  editRound: () => {},
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

  return (
    <RoundContext.Provider value={{ state, addRound, editRound }}>
      {children}
    </RoundContext.Provider>
  );
};
