"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp, CheckCircle2, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Exercise, SetData } from "@/types/training"
import { ExerciseMetadata } from "@/app/training/components/exercise-metadata"
import { ExerciseSetsTable } from "@/app/training/components/exercise-sets-table"

interface ExerciseDetailProps {
  exercise: Exercise
  isEditable?: boolean
  workoutState?: "not_started" | "in_progress" | "completed"
}

export function ExerciseDetail({ exercise: initialExercise, isEditable = false, workoutState = "not_started" }: ExerciseDetailProps) {
  // Convert array-based executedSets to record-based for initial state
  const convertedInitialExercise = {
    ...initialExercise,
    executedSets: initialExercise.executedSets
      ? Array.isArray(initialExercise.executedSets)
        ? initialExercise.executedSets.reduce(
            (acc, set, index) => {
              if (set) acc[index] = set
              return acc
            },
            {} as Record<number, SetData>,
          )
        : initialExercise.executedSets
      : {},
  }

  const [exercise, setExercise] = useState<Exercise>(convertedInitialExercise)
  const [isExpanded, setIsExpanded] = useState(false)
  const [editingSet, setEditingSet] = useState<number | null>(null)
  const [editValues, setEditValues] = useState<SetData>({ reps: 0, weight: 0 })

  // Reset exercise state when workout starts
  useEffect(() => {
    if (workoutState === "in_progress") {
      setExercise({
        ...initialExercise,
        executedSets: {},
      })
      setEditingSet(null)
    }
  }, [workoutState, initialExercise])

  // Check if all sets are completed
  const areAllSetsCompleted = () => {
    if (!exercise.executedSets) return false

    // Count how many sets are completed
    const completedSetsCount = Object.keys(exercise.executedSets).length

    // Check if all sets are completed
    return completedSetsCount === exercise.sets
  }

  // Start editing a set
  const handleEditSet = (setIndex: number) => {
    if (!isEditable) return

    const currentSet = exercise.executedSets?.[setIndex]
    if (currentSet) {
      setEditValues(currentSet)
    } else {
      // Default to target values if not yet executed
      setEditValues(exercise.targetSets[setIndex] || { reps: 0, weight: 0 })
    }
    setEditingSet(setIndex)
  }

  // Save edited values
  const handleSaveSet = (setIndex: number) => {
    const newExecutedSets = { ...(exercise.executedSets || {}) }
    newExecutedSets[setIndex] = { ...editValues }

    // Update exercise state
    setExercise({
      ...exercise,
      executedSets: newExecutedSets,
    })

    // Exit edit mode
    setEditingSet(null)
  }

  // Handle input changes
  const handleInputChange = (field: keyof SetData, value: string) => {
    const numValue = Number.parseFloat(value) || 0
    setEditValues({
      ...editValues,
      [field]: numValue,
    })
  }

  // Toggle set completion status
  const toggleSetCompletion = (setIndex: number, checked: boolean) => {
    if (!isEditable) return

    const newExecutedSets = { ...(exercise.executedSets || {}) }

    if (checked) {
      // If checking the box, add default values from target
      const targetSet = exercise.targetSets[setIndex] || { reps: 0, weight: 0 }
      newExecutedSets[setIndex] = { ...targetSet }

      // Set edit values and enter edit mode immediately
      setEditValues(targetSet)
      setEditingSet(setIndex)
    } else {
      // If unchecking, delete this specific set
      delete newExecutedSets[setIndex]
      // Exit edit mode if we were editing this set
      if (editingSet === setIndex) {
        setEditingSet(null)
      }
    }

    // Update exercise state
    setExercise({
      ...exercise,
      executedSets: newExecutedSets,
    })
  }

  // Check if a specific set is completed
  const isSetCompleted = (setIndex: number) => {
    return !!(exercise.executedSets && exercise.executedSets[setIndex])
  }

  // Determine if all sets are completed for styling
  const allCompleted = areAllSetsCompleted()

  return (
    <Card
      className={cn(
        "overflow-hidden transition-colors duration-300 py-2 gap-0",
        allCompleted && "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800",
      )}
    >
      {/* Exercise Header */}
      <div
        className={cn(
          "flex justify-between items-center px-4 cursor-pointer h-10",
          allCompleted && "bg-green-50 dark:bg-green-950/30",
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2 h-full">
          <h3 className="text-base font-semibold leading-none tracking-tight">{exercise.name}</h3>
          {allCompleted && <CheckCircle2 className="h-4 w-4 text-green-500 dark:text-green-400" />}
        </div>
        <div className="flex items-center gap-2 h-full">
          {!isEditable && <Lock className="h-4 w-4 text-muted-foreground" />}
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </div>

      {/* Exercise Content (expandable) */}
      <div className={cn("transition-all", isExpanded ? "max-h-[2000px]" : "max-h-0 overflow-hidden")}>
        <CardContent className={cn("pt-0 px-4 py-3", allCompleted && "bg-green-50 dark:bg-green-950/30", !isExpanded && "p-0")}>
          {isExpanded && <p className="text-sm text-muted-foreground mb-3">{exercise.description}</p>}

          <div className="space-y-3">
            {/* Exercise metadata */}
            <ExerciseMetadata restTime={exercise.restTime} technique={exercise.technique} isEditable={isEditable} />

            {/* Sets table */}
            <ExerciseSetsTable
              exercise={exercise}
              isEditable={isEditable}
              editingSet={editingSet}
              editValues={editValues}
              handleInputChange={handleInputChange}
              handleEditSet={handleEditSet}
              handleSaveSet={handleSaveSet}
              isSetCompleted={isSetCompleted}
              toggleSetCompletion={toggleSetCompletion}
            />
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
