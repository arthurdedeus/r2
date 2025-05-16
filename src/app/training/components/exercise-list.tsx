import type { Exercise } from "@/types/training"
import { ExerciseDetail } from "@/app/training/components/exercise-details"

interface ExerciseListProps {
  exercises: Exercise[]
  isEditable: boolean
  workoutState: "not_started" | "in_progress" | "completed"
}

export function ExerciseList({ exercises, isEditable, workoutState }: ExerciseListProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Exercises</h2>

      <div className="space-y-4">
        {exercises.map((exercise) => (
          <ExerciseDetail
            key={exercise.id}
            exercise={exercise}
            isEditable={isEditable}
            workoutState={workoutState}
          />
        ))}
      </div>
    </div>
  )
}
