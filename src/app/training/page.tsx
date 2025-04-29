import { trainingRoutines } from "@/data/training-routines"
import { TrainingRoutineCard } from "@/app/training/components/training-routine-card"

export default function TrainingPage() {
  return (
    <div className="container px-4 sm:px-6 py-6 md:py-10 mx-auto">
      <h1 className="text-2xl font-bold mb-6 md:text-3xl">Training Routines</h1>
      <p className="text-muted-foreground mb-6">Select a training routine to begin your workout session.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {trainingRoutines.map((routine) => (
          <TrainingRoutineCard key={routine.id} routine={routine} />
        ))}
      </div>
    </div>
  )
}
