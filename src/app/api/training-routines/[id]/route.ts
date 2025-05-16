import { NextResponse } from 'next/server'
import { trainingRoutines } from '@/data/training-routines'

export async function GET(request, { params }) {
  const { id } = params
  const routine = trainingRoutines.find((r) => r.id === id)
  if (!routine) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json(routine)
}
