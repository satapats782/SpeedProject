export interface Round {
  id: string; // Unique identifier for each round
  date: string;
  course: string;
  type: string;
  holes: number;
  strokes: number;
  time: {
    minutes: number;
    seconds: number;
  };
  speedgolfScore: number;
  notes: string;
  distance: number; // New distance field to store distance in feet
}
