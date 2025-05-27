import { NextResponse } from 'next/server'
import { trainingRoutines } from '@/data/training-routines'

export async function GET() {
  return NextResponse.json(trainingRoutines)
}
