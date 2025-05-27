export interface TrainingRoutine {
  id: string
  title: string
  description: string
  exerciseCount: number
  completedCount: number
  targetCompletions: number
  estimatedDuration: number // in minutes
}

export interface SetData {
  reps: number
  weight: number // in kg
}

// Changed to use a record for executed sets
export interface Exercise {
  id: string
  routineId: string
  name: string
  description: string
  sets: number
  restTime: number // in seconds
  technique?: string
  targetSets: SetData[]
  executedSets?: Record<number, SetData> // Changed to a record with set index as key
}
