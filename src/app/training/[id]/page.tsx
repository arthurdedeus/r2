import { notFound } from 'next/navigation'
import { trainingRoutines } from '@/data/training-routines'
import { TrainingDetailClient } from '@/app/training/[id]/client'

interface TrainingDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function TrainingDetailPage({
  params,
}: TrainingDetailPageProps) {
  const { id } = await params
  const routine = trainingRoutines.find((r) => r.id === id)

  if (!routine) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--page-background))]">
      <TrainingDetailClient routine={routine} />
    </div>
  )
}
