"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import type { TrainingRoutine } from "@/types/training"

type WorkoutState = "not_started" | "in_progress" | "completed"

export function useWorkout(routine: TrainingRoutine) {
  const [workoutState, setWorkoutState] = useState<WorkoutState>("not_started")
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const [currentTime, setCurrentTime] = useState<number>(0)

  // Timer effect - updates the current time every second when workout is in progress
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null

    if (workoutState === "in_progress" && startTime) {
      // Update the timer every second
      intervalId = setInterval(() => {
        const now = new Date()
        const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000)
        setCurrentTime(elapsed)
      }, 1000)
    }

    // Clean up the interval when the component unmounts or the workout state changes
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [workoutState, startTime])

  // Start the workout
  const startWorkout = () => {
    const now = new Date()
    setWorkoutState("in_progress")
    setStartTime(now)
    setCurrentTime(0)
    toast("Workout Started", {
      description: `You've started ${routine.title}. Good luck!`,
    })
  }

  // Cancel the workout
  const cancelWorkout = () => {
    setWorkoutState("not_started")
    setStartTime(null)
    setCurrentTime(0)
    setElapsedTime(0)
    toast("Workout Cancelled", {
      description: `You've cancelled ${routine.title}.`,
    })
  }

  // Complete the workout
  const completeWorkout = () => {
    const endTime = new Date()
    const duration = startTime ? Math.floor((endTime.getTime() - startTime.getTime()) / 1000) : 0
    setElapsedTime(duration)
    setWorkoutState("completed")

    // In a real app, this would be an API call to save the workout data
    console.log("Workout completed:", {
      routineId: routine.id,
      startTime,
      endTime,
      duration,
    })

    toast("Workout Completed!", {
      description: `Great job! You completed ${routine.title} in ${formatTime(duration)}.`,
    })
  }

  // Format time in HH:MM:SS
  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return [hrs > 0 ? String(hrs).padStart(2, "0") : null, String(mins).padStart(2, "0"), String(secs).padStart(2, "0")]
      .filter(Boolean)
      .join(":")
  }

  return {
    workoutState,
    startWorkout,
    completeWorkout,
    cancelWorkout,
    currentTime,
    elapsedTime,
    formatTime,
  }
}
