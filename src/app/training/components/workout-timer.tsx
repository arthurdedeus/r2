import { Timer } from "lucide-react"

interface WorkoutTimerProps {
  currentTime: number
  formatTime: (seconds: number) => string
}

export function WorkoutTimer({ currentTime, formatTime }: WorkoutTimerProps) {
  return (
    <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Timer className="h-5 w-5 text-blue-500 dark:text-blue-400" />
          <span className="font-medium">Workout Duration</span>
        </div>
        <div className="text-2xl font-mono font-bold tabular-nums">{formatTime(currentTime)}</div>
      </div>
    </div>
  )
}
