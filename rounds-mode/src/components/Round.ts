export interface Round {
  id: string;
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
}
