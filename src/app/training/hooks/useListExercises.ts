'use client'

import { useQuery } from '@tanstack/react-query'

async function fetchExercises(routineId: string) {
  const res = await fetch(`/api/training-routines/${routineId}/exercises`)
  if (!res.ok) throw new Error('Failed to fetch exercises')
  return res.json()
}

export function useListExercises(routineId: string) {
  return useQuery({
    queryKey: ['exercises', routineId],
    queryFn: () => fetchExercises(routineId),
    enabled: !!routineId,
  })
}
