import { notFound } from 'next/navigation'
import { trainingRoutines } from '@/data/training-routines'
import { TrainingDetailClient } from '@/app/training/[id]/client'

interface TrainingDetailPageProps {
  params: { id: string }
}

export default function TrainingDetailPage({ params }: TrainingDetailPageProps) {
  const { id } = params
  const routine = trainingRoutines.find((r) => r.id === id)

  if (!routine) {
    notFound()
  }

  return <TrainingDetailClient routine={routine} />
}
