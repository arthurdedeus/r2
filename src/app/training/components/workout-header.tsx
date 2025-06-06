"use client"

import Link from "next/link"
import { ArrowLeft, Play, CheckCircle, Timer, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { TrainingRoutine } from "@/types/training"

interface WorkoutHeaderProps {
  routine: TrainingRoutine
  workoutState: "not_started" | "in_progress" | "completed"
  onStartWorkout: () => void
  onCompleteWorkout: () => void
  onCancelWorkout: () => void
}

export function WorkoutHeader({ routine, workoutState, onStartWorkout, onCompleteWorkout, onCancelWorkout }: WorkoutHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <Link
          href="/training"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-3"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to routines
        </Link>

        <div className="flex items-center gap-2">
          {workoutState === "not_started" && (
            <Button onClick={onStartWorkout} className="flex items-center gap-2 cursor-pointer">
              <Play className="h-4 w-4" /> Start Routine
            </Button>
          )}

          {workoutState === "in_progress" && (
            <>
              <Button onClick={onCancelWorkout} variant="ghost" className="flex items-center gap-2">
                <X className="h-4 w-4" /> Cancel
              </Button>
              <Button onClick={onCompleteWorkout} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" /> Complete Workout
              </Button>
            </>
          )}
        </div>
      </div>

      <h1 className="text-2xl font-bold md:text-3xl">{routine.title}</h1>
      <p className="text-muted-foreground mt-2">{routine.description}</p>

      <div className="flex flex-wrap gap-4 mt-4">
        <div className="bg-muted rounded-md px-3 py-1 text-sm">{routine.exerciseCount} exercises</div>
        <div className="bg-muted rounded-md px-3 py-1 text-sm">{routine.estimatedDuration} min duration</div>
        <div className="bg-muted rounded-md px-3 py-1 text-sm">Completed {routine.completedCount} times</div>

        {workoutState === "in_progress" && (
          <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md px-3 py-1 text-sm flex items-center gap-1">
            <Timer className="h-3 w-3" /> Workout in progress
          </div>
        )}
      </div>
    </div>
  )
}
