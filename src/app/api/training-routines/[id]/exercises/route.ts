import { NextRequest, NextResponse } from 'next/server'
import { exercises } from '@/data/exercises'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const routineExercises = exercises.filter((e) => e.routineId === id)
  if (!routineExercises.length) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json(routineExercises)
}
