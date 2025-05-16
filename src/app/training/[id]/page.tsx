import { notFound } from 'next/navigation'
import { trainingRoutines } from '@/data/training-routines'
import { exercises } from '@/data/exercises'
import { TrainingDetailClient } from '@/app/training/[id]/client'

interface TrainingDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function TrainingDetailPage({ params }: TrainingDetailPageProps) {
  const { id } = await params
  const routine = trainingRoutines.find((r) => r.id === id)

  if (!routine) {
    notFound()
  }

  // Get exercises for this routine
  const routineExercises = exercises.filter((e) => e.routineId === routine.id)

  return <TrainingDetailClient routine={routine} exercises={routineExercises} />
}
