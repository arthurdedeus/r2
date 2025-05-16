'use client'
import { useQuery } from '@tanstack/react-query'

async function fetchTrainingRoutines() {
  const res = await fetch('/api/training-routines')
  if (!res.ok) throw new Error('Failed to fetch training routines')
  return res.json()
}

export function useListTrainings() {
  return useQuery({
    queryKey: ['training-routines'],
    queryFn: fetchTrainingRoutines,
  })
}
