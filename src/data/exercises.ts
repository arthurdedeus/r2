import type { Exercise, SetData } from "@/types/training"

// Helper function to convert array to record for executed sets
function createExecutedSetsRecord(sets: SetData[]): Record<number, SetData> {
  return sets.reduce(
    (acc, set, index) => {
      acc[index] = set
      return acc
    },
    {} as Record<number, SetData>,
  )
}

export const exercises: Exercise[] = [
  // Upper Body Strength Routine
  {
    id: "bench-press",
    routineId: "upper-body",
    name: "Bench Press",
    description:
      "Lie on a flat bench and press the barbell upward, extending your arms fully before lowering the weight back to chest level.",
    sets: 4,
    restTime: 90,
    technique: "Rest/Pause",
    targetSets: [
      { reps: 8, weight: 80 },
      { reps: 8, weight: 80 },
      { reps: 8, weight: 75 },
      { reps: 8, weight: 75 },
    ],
    executedSets: createExecutedSetsRecord([
      { reps: 8, weight: 80 },
      { reps: 8, weight: 80 },
      { reps: 7, weight: 75 },
      { reps: 6, weight: 75 },
    ]),
  },
  {
    id: "overhead-press",
    routineId: "upper-body",
    name: "Overhead Press",
    description: "Press the barbell from shoulder height until your arms are fully extended overhead.",
    sets: 3,
    restTime: 90,
    targetSets: [
      { reps: 10, weight: 50 },
      { reps: 10, weight: 50 },
      { reps: 10, weight: 45 },
    ],
    executedSets: createExecutedSetsRecord([
      { reps: 10, weight: 50 },
      { reps: 8, weight: 50 },
      { reps: 8, weight: 45 },
    ]),
  },
  {
    id: "pull-ups",
    routineId: "upper-body",
    name: "Pull-ups",
    description:
      "Hang from a bar with palms facing away from you and pull your body up until your chin is over the bar.",
    sets: 3,
    restTime: 60,
    targetSets: [
      { reps: 12, weight: 0 },
      { reps: 10, weight: 0 },
      { reps: 8, weight: 0 },
    ],
    // No executed sets yet
  },
  {
    id: "barbell-row",
    routineId: "upper-body",
    name: "Barbell Row",
    description: "Bend at the hips, keep your back straight, and pull the barbell to your lower chest.",
    sets: 3,
    restTime: 90,
    technique: "Drop Sets",
    targetSets: [
      { reps: 10, weight: 60 },
      { reps: 10, weight: 60 },
      { reps: 10, weight: 55 },
    ],
    executedSets: createExecutedSetsRecord([
      { reps: 10, weight: 60 },
      { reps: 10, weight: 60 },
      { reps: 8, weight: 55 },
    ]),
  },
  {
    id: "tricep-dips",
    routineId: "upper-body",
    name: "Tricep Dips",
    description: "Support your weight on parallel bars and lower your body by bending your arms, then push back up.",
    sets: 3,
    restTime: 60,
    targetSets: [
      { reps: 12, weight: 0 },
      { reps: 12, weight: 0 },
      { reps: 10, weight: 0 },
    ],
    executedSets: createExecutedSetsRecord([
      { reps: 12, weight: 0 },
      { reps: 10, weight: 0 },
      { reps: 8, weight: 0 },
    ]),
  },
  {
    id: "bicep-curls",
    routineId: "upper-body",
    name: "Bicep Curls",
    description:
      "Curl the dumbbells or barbell from a fully extended arm position to shoulder level, keeping elbows fixed.",
    sets: 3,
    restTime: 60,
    technique: "Forced Reps",
    targetSets: [
      { reps: 12, weight: 15 },
      { reps: 12, weight: 15 },
      { reps: 10, weight: 12.5 },
    ],
    executedSets: createExecutedSetsRecord([
      { reps: 12, weight: 15 },
      { reps: 12, weight: 15 },
      { reps: 12, weight: 12.5 },
    ]),
  },

  // Lower Body Power Routine
  {
    id: "squats",
    routineId: "lower-body",
    name: "Barbell Squats",
    description:
      "Place a barbell on your upper back, bend your knees and hips to lower your body, then return to standing.",
    sets: 4,
    restTime: 120,
    technique: "Rest/Pause",
    targetSets: [
      { reps: 8, weight: 100 },
      { reps: 8, weight: 100 },
      { reps: 8, weight: 95 },
      { reps: 8, weight: 95 },
    ],
    executedSets: createExecutedSetsRecord([
      { reps: 8, weight: 100 },
      { reps: 7, weight: 100 },
      { reps: 6, weight: 95 },
      { reps: 6, weight: 90 },
    ]),
  },
  {
    id: "deadlifts",
    routineId: "lower-body",
    name: "Deadlifts",
    description:
      "Lift a barbell from the ground to hip level, keeping your back straight and using your legs and hips.",
    sets: 3,
    restTime: 180,
    targetSets: [
      { reps: 6, weight: 120 },
      { reps: 6, weight: 120 },
      { reps: 6, weight: 110 },
    ],
    // No executed sets yet
  },
  // Other exercises remain the same structure...
]
