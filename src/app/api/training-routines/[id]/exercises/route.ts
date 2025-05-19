import { NextResponse } from 'next/server'
import { exercises } from '@/data/exercises'

export async function GET(request, { params }: { params: { id: string } }) {
  const { id } = params
  const routineExercises = exercises.filter((e) => e.routineId === id)
  if (!routineExercises.length) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json(routineExercises)
}
