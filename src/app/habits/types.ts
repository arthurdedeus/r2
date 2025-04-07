export type Mark = "" | "•" | "X";

export type Habit = {
  id: number;
  name: string;
  marks: Mark[];
};

export type HabitGroup = {
  id: number;
  user_id: string;
  created_at: Date;
  habits: Habit[];
};
