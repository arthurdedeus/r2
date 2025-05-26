'use client'
import { TrainingRoutineCard } from "@/app/training/components/training-routine-card"
import { useListTrainings } from "@/app/training/hooks/useListTrainings"
import type { TrainingRoutine } from "@/types/training"

export default function TrainingPage() {
  const { data: trainingRoutines, isLoading, isError } = useListTrainings()

  return (
    <div className="container px-4 sm:px-6 py-6 md:py-10 mx-auto min-h-screen bg-[hsl(var(--page-background))]">
      <h1 className="text-2xl font-bold mb-6 md:text-3xl">Training Routines</h1>
      <p className="text-muted-foreground mb-6">Select a training routine to begin your workout session.</p>

      {isLoading && <div>Loading...</div>}
      {isError && <div>Failed to load training routines.</div>}
      {trainingRoutines && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {trainingRoutines.map((routine: TrainingRoutine) => (
            <TrainingRoutineCard key={routine.id} routine={routine} />
          ))}
        </div>
      )}
    </div>
  )
}
