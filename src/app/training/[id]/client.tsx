"use client"

import { useWorkout } from "@/hooks/use-workout"
import { WorkoutCompletionAlert } from "@/app/training/components/workout-completion-alert"
import { ExerciseList } from "@/app/training/components/exercise-list"
import { WorkoutHeader } from "@/app/training/components/workout-header"
import { WorkoutTimer } from "@/app/training/components/workout-timer"
import type { TrainingRoutine } from "@/types/training"
import { useListExercises } from "@/app/training/hooks/useListExercises"

interface TrainingDetailClientProps {
  routine: TrainingRoutine
}

export function TrainingDetailClient({ routine }: TrainingDetailClientProps) {
  // Use the workout hook to manage workout state and timing
  const { workoutState, startWorkout, completeWorkout, cancelWorkout, currentTime, elapsedTime, formatTime } = useWorkout(routine)
  const { data: exercises, isLoading, isError } = useListExercises(routine.id)

  return (
    <div className="container px-4 sm:px-6 py-6 md:py-10 mx-auto">
      {/* Workout header with title, description, and controls */}
      <WorkoutHeader
        routine={routine}
        workoutState={workoutState}
        onStartWorkout={startWorkout}
        onCompleteWorkout={completeWorkout}
        onCancelWorkout={cancelWorkout}
      />

      {/* Live Timer (only shown during workout) */}
      {workoutState === "in_progress" && <WorkoutTimer currentTime={currentTime} formatTime={formatTime} />}

      {/* Completion Alert (only shown after completion) */}
      {workoutState === "completed" && <WorkoutCompletionAlert elapsedTime={elapsedTime} formatTime={formatTime} />}

      {/* Exercise List */}
      {isLoading && <div>Loading exercises...</div>}
      {isError && <div>Failed to load exercises.</div>}
      {exercises && (
        <ExerciseList
          exercises={exercises}
          isEditable={workoutState === "in_progress"}
          workoutState={workoutState}
        />
      )}
    </div>
  )
}
