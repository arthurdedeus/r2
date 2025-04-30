import { notFound } from "next/navigation"
import { trainingRoutines } from "@/data/training-routines"
import { exercises } from "@/data/exercises"
import { TrainingDetailClient } from "@/app/training/[id]/client"

export default function TrainingDetailPage({ params }: { params: { id: string } }) {
  // Find the routine
  const routine = trainingRoutines.find((r) => r.id === params.id)

  if (!routine) {
    notFound()
  }

  // Get exercises for this routine
  const routineExercises = exercises.filter((e) => e.routineId === routine.id)

  return <TrainingDetailClient routine={routine} exercises={routineExercises} />
}
