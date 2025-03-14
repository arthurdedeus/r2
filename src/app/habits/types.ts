export type Mark = "" | "•" | "X";

export type Habit = {
  id: number;
  name: string;
  marks: Mark[];
};
