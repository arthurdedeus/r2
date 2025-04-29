"use client"
import { notFound } from "next/navigation"
import { trainingRoutines } from "@/data/training-routines"
import { exercises } from "@/data/exercises"
import { useWorkout } from "@/hooks/use-workout"
import { WorkoutCompletionAlert } from "@/app/training/components/workout-completion-alert"
import { ExerciseList } from "@/app/training/components/exercise-list"
import { WorkoutHeader } from "@/app/training/components/workout-header"
import { WorkoutTimer } from "@/app/training/components/workout-timer"

export default function TrainingDetailPage({ params }: { params: { id: string } }) {
  // Find the routine
  const routine = trainingRoutines.find((r) => r.id === params.id)

  if (!routine) {
    notFound()
  }

  // Get exercises for this routine
  const routineExercises = exercises.filter((e) => e.routineId === routine.id)

  // Use the workout hook to manage workout state and timing
  const { workoutState, startWorkout, completeWorkout, currentTime, elapsedTime, formatTime } = useWorkout(routine)

  return (
    <div className="container px-4 sm:px-6 py-6 md:py-10 mx-auto">
      {/* Workout header with title, description, and controls */}
      <WorkoutHeader
        routine={routine}
        workoutState={workoutState}
        onStartWorkout={startWorkout}
        onCompleteWorkout={completeWorkout}
      />

      {/* Live Timer (only shown during workout) */}
      {workoutState === "in_progress" && <WorkoutTimer currentTime={currentTime} formatTime={formatTime} />}

      {/* Completion Alert (only shown after completion) */}
      {workoutState === "completed" && <WorkoutCompletionAlert elapsedTime={elapsedTime} formatTime={formatTime} />}

      {/* Exercise List */}
      <ExerciseList exercises={routineExercises} isEditable={workoutState === "in_progress"} />
    </div>
  )
}
